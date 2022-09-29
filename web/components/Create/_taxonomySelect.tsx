import { Grid, LoadingOverlay, Select } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";

interface Cactus {
  inputProps: any;
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};
const TaxonomySelect: React.FC<Cactus> = ({ inputProps }) => {
  const response = useSWR("/api/taxonomy/", fetcher);
  const data = response.data;
  const error_response = response.error;

  const [tribes, setTribes] = useState([{ value: "", label: "" }]);
  const [genres, setGenres] = useState([{ value: "", label: "" }]);

  const [currentSubfamilyId, setSubfamilyId] = useState("");
  const [currentTribeId, setTribeId] = useState("");

  const [tribesDisabled, setTribesDisabled] = useState(true);
  const [genresDisabled, setGenresDisabled] = useState(true);

  if (error_response) return <div>Failed to load filters</div>;
  if (!data) return <LoadingOverlay visible={true} />;

  function getTribesBySubFamilyId(subfamilies: any, id: any) {
    let ans = -1;
    subfamilies.forEach((item: any, index: any) => {
      if (item.value === id) {
        ans = index;
      }
    });

    if (ans === -1) {
      return [];
    }

    return subfamilies[ans].tribes;
  }

  function getGenresByTribeId(tribes: any, id: any) {
    let ans = -1;
    tribes.forEach((item: any, index: any) => {
      if (item.value === id) {
        ans = index;
      }
    });

    if (ans === -1) {
      return [];
    }

    return tribes[ans].genres;
  }

  return (
    <Grid>
      <Grid.Col md={3} lg={4}>
        <Select
          required
          label="Sub Familia"
          placeholder="Todas"
          data={data}
          defaultValue=""
          nothingFound="No options"
          value={currentSubfamilyId}
          onChange={(e) => {
            if (e !== null && e !== currentSubfamilyId) {
              setTribes(getTribesBySubFamilyId(data, e));
              setGenres([]);
              setSubfamilyId(e);
              setTribeId("");
              setTribesDisabled(false);
              setGenresDisabled(true);

              if (e === "") {
                setTribesDisabled(true);
              }
            }
          }}
        />
      </Grid.Col>

      <Grid.Col md={3} lg={4}>
        <Select
          required
          label="Tribu"
          placeholder="Todas"
          disabled={tribesDisabled}
          data={tribes}
          defaultValue=""
          nothingFound="No options"
          value={currentTribeId}
          onChange={(e) => {
            if (e !== null && e !== currentTribeId) {
              setGenres(getGenresByTribeId(tribes, e));
              setTribeId(e);
              setGenresDisabled(false);

              if (e === "") {
                setGenresDisabled(true);
              }
            }
          }}
        />
      </Grid.Col>
      <Grid.Col md={3} lg={4}>
        <Select
          required
          label="Género"
          placeholder="Todas"
          disabled={genresDisabled}
          {...inputProps}
          data={genres}
          nothingFound="No options"
          defaultValue=""
        />
      </Grid.Col>
    </Grid>
  );
};

export default TaxonomySelect;

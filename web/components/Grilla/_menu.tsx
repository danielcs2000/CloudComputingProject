import { Grid, Loader, LoadingOverlay, Select } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";

interface Cactus {
  menuParams: { genreId: string; tribeId: string; subFamilyId: string };
  setMenuParams: Dispatch<
    SetStateAction<{ genreId: string; tribeId: string; subFamilyId: string }>
  >;
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

const Menu: React.FC<Cactus> = ({ menuParams, setMenuParams }) => {
  const response = useSWR("/api/taxonomy/", fetcher);
  const data = response.data;
  const error = response.error;

  const [tribes, setTribes] = useState([{ value: "", label: "" }]);
  const [genres, setGenres] = useState([{ value: "", label: "" }]);

  const [tribesDisabled, setTribesDisabled] = useState(true);
  const [genresDisabled, setGenresDisabled] = useState(true);

  if (error) return <div>Failed to load filters</div>;
  if (!data) return <Loader />;

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
          label="Sub Familia"
          placeholder="Todas"
          data={data.concat({ value: "", label: "Todas" })}
          defaultValue=""
          nothingFound="No options"
          value={menuParams.subFamilyId}
          onChange={(e) => {
            console.log("s", e);
            if (e !== null && e !== menuParams.subFamilyId) {
              setTribes(getTribesBySubFamilyId(data, e));
              setGenres([]);

              setTribesDisabled(false);
              setGenresDisabled(true);

              if (e === "") {
                setTribesDisabled(true);
              }

              setMenuParams({
                subFamilyId: e,
                tribeId: "",
                genreId: "",
              });
            }
          }}
        />
      </Grid.Col>
      <Grid.Col md={3} lg={4}>
        <Select
          label="Tribu"
          placeholder="Todas"
          disabled={tribesDisabled}
          data={tribes.concat({ value: "", label: "Todas" })}
          defaultValue=""
          nothingFound="No options"
          value={menuParams.tribeId}
          onChange={(e) => {
            if (e !== null && e !== menuParams.tribeId) {
              setGenres(getGenresByTribeId(tribes, e));

              setGenresDisabled(false);
              if (e === "") {
                setGenresDisabled(true);
              }

              setMenuParams({
                subFamilyId: menuParams.subFamilyId,
                tribeId: e,
                genreId: "",
              });
            }
          }}
        />
      </Grid.Col>
      <Grid.Col md={3} lg={4}>
        <Select
          label="Género"
          placeholder="Todas"
          disabled={genresDisabled}
          value={menuParams.genreId}
          data={genres.concat({ value: "", label: "Todas" })}
          nothingFound="No options"
          defaultValue=""
          onChange={(e) => {
            if (e !== null && e !== menuParams.genreId) {
              setMenuParams({
                genreId: e,
                subFamilyId: menuParams.subFamilyId,
                tribeId: menuParams.tribeId,
              });
            }
          }}
        />
      </Grid.Col>
    </Grid>
  );
};

export default Menu;

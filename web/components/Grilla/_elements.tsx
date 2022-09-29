import { Grid, Skeleton } from "@mantine/core";
import { SpeciesBody } from "../../types/species";
import useSWR, { mutate } from "swr";
import CactusCard from "./_card";
import Alerta from "./_alerta";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Elements(props: any) {
  let filterParams = props.filters;

  const queryParams = filterParams;
  const queryString = new URLSearchParams(queryParams).toString();

  const response = useSWR("api/species?" + queryString, fetcher);

  const data = response.data as SpeciesBody[];
  const error = response.error;

  if (error) return <div>Fallo al cargar</div>;
  if (!data)
    return (
      <Grid gutter="xl">
        {Object.keys([...Array(8)]).map((key) => (
          <Grid.Col sm={6} md={4} lg={3} key={key}>
            <Skeleton height={200} mt={6} />
          </Grid.Col>
        ))}
      </Grid>
    );

  return (
    <>
      {data.length === 0 && <Alerta />}
      <Grid gutter="xl">
        {data.map((dato) => (
          <Grid.Col sm={6} md={4} lg={3} key={dato.name}>
            <CactusCard
              mutate={response.mutate}
              title={dato.name}
              src={
                dato.photoUrls.length > 0
                  ? dato.photoUrls[0]
                  : "cactus/default.jpg"
              }
              idC={dato.id}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

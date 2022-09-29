import { Grid, Skeleton } from "@mantine/core";
import { OutputGetSingleDistribution } from "../../types/distributions";
import useSWR from "swr";
import ObsCard from "./_card";
import Alerta from "../Grilla/_alerta";
import styles from "../../styles/Obs.module.css";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Observaciones(props: any) {
  //let filterParams = props.filters;

  const queryParams = {
    speciesId: props.speciesId,
  };
  const queryString = new URLSearchParams(queryParams).toString();

  const response = useSWR("../../api/distributions/?" + queryString, fetcher);

  const data = response.data as OutputGetSingleDistribution[];
  const error = response.error;

  if (error) return <div className={styles.alerta}>Fallo al cargar</div>;
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

  console.log(data);

  return (
    <>
      {data.length === 0 && <Alerta />}
      <Grid gutter="xl">
        {data.map((dato) => (
          <Grid.Col sm={6} md={4} lg={3} key={dato.id}>
            <ObsCard
              mutate={response.mutate}
              src={
                dato.photoUrls.length > 0
                  ? dato.photoUrls[0]
                  : "cactus/default.jpg"
              }
              title={
                dato.colector +
                " " +
                dato.colectionNumber +
                " (" +
                dato.herbarium +
                ")"
              }
              idObs={dato.id}
              idSpecie={props.speciesId}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

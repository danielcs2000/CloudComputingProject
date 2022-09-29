import {
  Button,
  Grid,
  LoadingOverlay,
  Title,
  Text
} from "@mantine/core";
import Observaciones from "./_grid";
import { FilePlus } from "tabler-icons-react";
import { useRouter } from "next/router";
import { Roles } from "../../types/role";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { OutputGetSingleSpecies } from "../../types/species";
import styles from "../../styles/Especie.module.css";
import { useStyles } from "../../utils/styles";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function GrillaObs(props: any) {
  const { classes } = useStyles();
  const router = useRouter();
  const { data: session, status } = useSession();
  const response = useSWR("/api/species/" + props.id, fetcher);
  const dataSpecie = response.data as OutputGetSingleSpecies;
  const error = response.error;
  if (error) return <div>Failed to load</div>;
  if (!dataSpecie) return <LoadingOverlay visible={true} />;

  function crear() {
    router.push("/especies/create/obs/" + props.id);
  }

  return (
    <>
      <Grid justify="space-between" pb={20}>
        <Grid.Col lg={10}>
          <Title order={1}>Registros de <div className={classes.italicWord} >{dataSpecie.name}   </div></Title>
        </Grid.Col>
        <Grid.Col lg={2} className={styles.colButton}>
          <Button onClick={() => router.back()}>Regresar</Button>
        </Grid.Col>
      </Grid>
      {session && session.user.role !== Roles.GUEST && (
        <Button
          mb={20}
          size="md"
          leftIcon={<FilePlus size={25} strokeWidth={2} color={"white"} />}
          onClick={() => crear()}
        >
          Agregar una nueva observación
        </Button>
      )}
      <Observaciones speciesId={props.id} />
    </>
  );
}

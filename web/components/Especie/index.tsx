import {
  Title,
  Button,
  Grid,
  Divider,
  Paper,
  Text,
  Modal,
  Box,
  LoadingOverlay,
  Group,
  Badge,
} from "@mantine/core";
import { useRouter } from "next/router";
import { OutputGetSingleSpecies } from "../../types/species";
import useSWR from "swr";
import Acordeon from "./_acordeon";
import TimeLine from "./_timeLine";
import CarouselFotos from "./_carousel";
import { useSession } from "next-auth/react";
import style from "../../styles/Especie.module.css";
import { useStyles } from "../../utils/styles";
import dynamic from "next/dynamic";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Roles } from "../../types/role";
import BarChart from "../BarChart";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Especie(props: any) {
  const { classes } = useStyles();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { data: session, status } = useSession();
  const idSpecie: any = props.id;
  const response = useSWR("/api/species/" + idSpecie, fetcher);
  const data = response.data as OutputGetSingleSpecies;
  const error = response.error;
  const Map = dynamic(
    () => import("../Map"), // replace '@components/map' with your component's location
    {
      loading: () => <p>El mapa se está cargando</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );

  async function handleDelete(specieId: string) {
    try {
      const { data } = await axios.delete("/api/species/" + specieId);

      console.log(JSON.stringify(data, null, 4));
      setOpened(false);
      router.back();
      showNotification({
        title: "¡Eliminado!",
        message: "Se eliminó correctamente la especie",
        color: "lime",
      });

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        showNotification({
          title: "¡Error!",
          message: "No se pudo eliminar la especie",
          color: "red",
        });
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        showNotification({
          title: "¡Error!",
          message: "No se pudo eliminar la especie",
          color: "red",
        });
        return "An unexpected error occurred";
      }
    }
  }

  if (error) return <div>Fallo al cargar</div>;
  if (!data) return <LoadingOverlay visible={true} />;

  console.log(data);
  return (
    <>
      <Grid justify="space-between" pb={20}>
        <Grid.Col md={4} lg={8}>
          <Title order={1} className={classes.italicWord}>
            {data.name}
          </Title>
        </Grid.Col>
        <Grid.Col md={4} lg={4} className={style.colButton}>
          <Group>
            <Button
              onClick={() => router.push(`/especies/${idSpecie}/observaciones`)}
            >
              Ver registros: {data.number_obs}
            </Button>
            <Button onClick={() => router.back()} variant="outline">
              Regresar
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col md={9} lg={8}>
          <Acordeon
            morph={data.morphology}
            habitad={data.habitad}
            uicnURL={data.iucnUrl}
            uiCode={data.iucnCode}
            citiesURL={data.citiesUrl}
            citiesCode={data.citiesCode}
            names={data.names}
          />
        </Grid.Col>
        <Grid.Col md={3} lg={4}>
          <Box mr="xs" className={style.boxTimeLine}>
            <Title order={2} align="right" mb="xs" mt="xs">
              Árbol de familia
            </Title>
            <TimeLine
              family_name={data.family_name}
              subfamily_name={data.subfamily_name}
              tribe_name={data.tribe_name}
              genre_name={data.genre_name}
              especie_name={data.name}
            />
          </Box>
        </Grid.Col>
      </Grid>
      {data.departaments.length !== 0 ? (
        <>
          <Title order={3} mt={20} mb={10}>
            Departamentos en donde se encuentra
          </Title>
          {data.departaments.map((name: string, index: any) => (
            <Badge key={index}>{name}</Badge>
          ))}
        </>
      ) : null}
      <Grid>
        <Grid.Col md={6} lg={6} pt="lg">
          <Paper shadow="xl" p="xl">
            {/* <Title order={2} pt="lg">
              Mapa
            </Title> */}
            <Map dataObs={data.dataObs} />
          </Paper>
        </Grid.Col>
        {(data.photoUrls?.length || 0) > 0 && (
          <Grid.Col md={6} lg={6} pt="lg">
            <Paper shadow="xl" p="xl">
              <Title order={2} pt="lg">
                Imágenes
              </Title>
              <CarouselFotos imageList={data.photoUrls} />
            </Paper>
          </Grid.Col>
        )}
        <Grid.Col md={6} lg={6} pt="lg">
          <Paper shadow="xl" p="xl">
            <Title order={2} pt="lg">
              Fenología
            </Title>
            <BarChart data={data.distributionFrequency} />
          </Paper>
        </Grid.Col>
      </Grid>

      <Group position="center" mt="md">
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          title="¡Atención!"
          overlayOpacity={0.55}
        >
          <Text>
            {" "}
            Esta acción eliminará a la especie seleccionada y a todos sus
            registros asociados
          </Text>
          <Group position="center" mt={"xl"}>
            <Button onClick={() => setOpened(false)} variant="outline">
              Cancelar
            </Button>
            <Button onClick={() => handleDelete(idSpecie)}>Continuar</Button>
          </Group>
        </Modal>
        {session && session.user.role !== Roles.GUEST && (
          <>
            <Button color={"red"} onClick={() => setOpened(true)}>
              Eliminar
            </Button>
            <Button onClick={() => router.push(`/especies/${idSpecie}/editar`)}>
              Editar
            </Button>
          </>
        )}
      </Group>
    </>
  );
}

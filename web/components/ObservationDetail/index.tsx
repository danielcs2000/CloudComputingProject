import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  List,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { OutputGetSingleDistribution } from "../../types/distributions";
import CarouselFotos from "../Especie/_carousel";
import style from "../../styles/Especie.module.css";
import { useMantineTheme } from "@mantine/core";
import TimeLine from "./_timeLine";
import "dayjs/locale/es";
import { useStyles } from "../../utils/styles";
import dynamic from "next/dynamic";
import { CalendarEvent, Checklist, Plant2 } from "tabler-icons-react";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function ObsDetail(props: any) {
  const { classes } = useStyles();
  const router = useRouter();
  const { data: session, status } = useSession();
  const theme = useMantineTheme();
  const idObs: any = props.id;
  const response = useSWR("/api/distributions/" + idObs, fetcher);
  const data = response.data as OutputGetSingleDistribution;
  const error = response.error;
  if (error) return <div>Failed to load</div>;
  if (!data) return <LoadingOverlay visible={true} />;
  const fecha: string = data.colectedAt as unknown as string;
  const dia: number = parseInt(fecha.substring(8, 10));
  const year: number = parseInt(fecha.substring(0, 4));
  const month: number = parseInt(fecha.substring(5, 7)) - 1;

  const Map = dynamic(
    () => import("../Map"), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );
  const dataObs = { position: [data.latitude, data.longitude], text: (data.colector + " " + data.colectionNumber + " (" + data.herbarium + ")") };

  return (
    <>
      {console.log(data)}
      <Grid justify="space-between" pb={20}>
        <Grid.Col md={4} lg={8}>
          <Title order={1} className={classes.italicWord}>
            {data.colector}
          </Title>
        </Grid.Col>
        <Grid.Col md={4} lg={4} className={style.colButton}>
          <Button onClick={() => router.back()}>Regresar</Button>
        </Grid.Col>
      </Grid>
      <Grid mt={10}>
        <Grid.Col lg={8}>
          {" "}
          <Paper shadow="md" p="md">
            <Title order={3} mb={5}>
              Datos
            </Title>
            <List>
              <div>Número de colección</div>
              <List.Item
                icon={
                  <ThemeIcon color="lime" size={26} radius="xl">
                    <Checklist size={19} />
                  </ThemeIcon>
                }
                className={style.colData}
              >
                {data.colectionNumber}
              </List.Item>
              <div>Herbario</div>
              <List.Item
                className={style.colData}
                icon={
                  <ThemeIcon color="lime" size={26} radius="xl">
                    <Plant2 size={19} />
                  </ThemeIcon>
                }
              >
                {data.herbarium}
              </List.Item>
              <div>Fecha de recolección</div>
              <List.Item className={style.colData} icon={
                <ThemeIcon color="lime" size={26} radius="xl">
                  <CalendarEvent size={19} />
                </ThemeIcon>
              } >{`${dia}-${month}-${year}`}</List.Item>
            </List>
          </Paper>
        </Grid.Col>
        <Grid.Col lg={4} md={50}>
          <Box mr="xs" className={style.boxTimeLine}>
            <Title order={2} align="right" mb="xs">
              Ubicación
            </Title>
            <TimeLine
              department={data.department}
              province={data.province}
              location={data.location}
            />
          </Box>
        </Grid.Col>
      </Grid>
      {data.aditionalNotes === "<p><br></p>" ||
        data.aditionalNotes === undefined ? null : (
        <Stack mt={10} mb={10}>
          <Title order={2}>Notas adicionales</Title>
          <TypographyStylesProvider>
            <div
              dangerouslySetInnerHTML={{ __html: `${data.aditionalNotes}` }}
            />
          </TypographyStylesProvider>
        </Stack>
      )}
      <Grid>
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
            <Title order={2} mb={10}>
              Mapa
            </Title>
            <Map dataObs={[dataObs]} />
          </Paper>
        </Grid.Col>
      </Grid>
      <Group position="center">
        <Button
          onClick={() =>
            router.push(
              `/especies/62d5d9d396a9d9aafefbf80e/observacion/${data.id}/editar`
            )
          }
          mt={20}
        >
          Editar
        </Button>
      </Group>
    </>
  );
}

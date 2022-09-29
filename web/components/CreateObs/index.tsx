import {
  Title,
  Button,
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  InputWrapper,
  List,
  Grid,
  ThemeIcon,
  NumberInput,
  Select,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useReducer, useState } from "react";
import { Plant2 } from "tabler-icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { DropFiles } from "../DropFiles";
import { FiCheckCircle, FiTrash } from "react-icons/fi";
import { useSession } from "next-auth/react";
import data from "../Create/_data";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/es";
import { OutputGetSingleSpecies } from "../../types/species";
import useSWR from "swr";
import RichTextEditor from "@mantine/rte";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

interface FormValues {
  department: string;
  province: string;
  location: string;
  elevation: number;
  longitude: number;
  latitude: number;
  colector: string;
  colectionNumber: string;
  colectedAt: Date;
  herbarium: string;
  aditionalNotes: string;
  photoUrls: string[];
  speciesId: string;
}

function reducer(state: any, action: { type: any; payload: any }) {
  switch (action.type) {
    case "append":
      return [...state, action.payload];
    case "replace":
      return action.payload;
    case "delete":
      axios
        .post("/api/aws/delete", {
          key: action.payload,
        })
        .then((res) => {});
      return state.filter((item: string) => item !== action.payload);
  }
}

export default function ObsForm(props: any) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [uploadingFilesToAWS, setUploadingFilesToAWS] = useState(false);
  const [filesKeys, dispatchFilesKeys] = useReducer(reducer, []);
  const response = useSWR("/api/species/" + props.speciesId, fetcher);
  const dataSpecie = response.data as OutputGetSingleSpecies;
  const error = response.error;
  console.log("props", props?.data);

  const form = useForm<FormValues>({
    initialValues: props?.data || {
      department: "",
      province: "",
      location: "",
      elevation: 0,
      longitude: 0.0,
      latitude: 0.0,
      colector: "",
      colectionNumber: "",
      colectedAt: new Date(),
      herbarium: "",
      photoUrls: [],
      aditionalNotes: "<p><br></p>",
      speciesId: props.speciesId,
    },

    validate: {},
  });

  useEffect(() => {
    console.log("photoUrls", filesKeys);
    form.setFieldValue("photoUrls", filesKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesKeys]);

  useEffect(() => {
    if (props.edit) {
      dispatchFilesKeys({
        type: "replace",
        payload: props.data.photoUrls,
      });
    }
  }, [props?.data?.photoUrls, props.edit]);

  if (!props.edit) {
    if (error) return <div>Failed to load</div>;
    if (!dataSpecie) return <LoadingOverlay visible={true} />;
  }

  async function handleSubmit(values: typeof form.values) {
    try {
      const body = { ...values };
      if (props.edit) {
        console.log("send", body);

        const { data } = await axios.patch(
          "/api/distributions/" + props.obsId,
          body
        );

        console.log("updated", JSON.stringify(data, null, 4));
        showNotification({
          title: "¡Actualizado!",
          message: "Se editó la información correctamente",
          color: "lime",
        });
        router.back();
        return data;
      } else {
        const { data } = await axios.post("/api/distributions/", body);
        console.log(JSON.stringify(data, null, 4));
        showNotification({
          title: "¡Creado!",
          message: "Se creó correctamente el registro",
          color: "lime",
        });
        router.back();
        return data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        showNotification({
          title: "¡Error!",
          message: "No se pudo crear el registro",
          color: "red",
        });
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        showNotification({
          title: "¡Error!",
          message: "No se pudo crear el registro",
          color: "red",
        });
        return "An unexpected error occurred";
      }
    }
  }

  return (
    <>
      <Title order={1} pb="md">
        {props.edit ? "Editar Registro" : "Crear Registro"}
      </Title>
      <Box sx={{ maxWidth: 1000 }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {props.edit ? null : (
            <TextInput
              value={dataSpecie.name}
              disabled
              label={"Nombre de la especie"}
              size="md"
            />
          )}
          <TextInput
            label="Nombre(s) colector(es)"
            required
            mt={10}
            placeholder="Nombre(es)"
            {...form.getInputProps("colector")}
          />
          <TextInput
            label="Número de colección"
            required
            mt={10}
            placeholder="Número"
            {...form.getInputProps("colectionNumber")}
          />
          <Group grow mt="xs" mb="xs">
            <Select
              {...form.getInputProps("department")}
              data={data}
              required
              label="Departamento"
              placeholder="Elige uno"
              searchable
              nothingFound="Nada encontrado"
            />
            <TextInput
              label="Provincia"
              placeholder="Nombre"
              {...form.getInputProps("province")}
            />
            <TextInput
              label="Locación"
              placeholder="Nombre"
              {...form.getInputProps("location")}
            />
          </Group>
          <Grid grow mt="xs" mb="xs">
            <Grid.Col span={6}>
              <NumberInput
                placeholder="0"
                label="Latitud °"
                step={0.00001}
                precision={5}
                {...form.getInputProps("latitude")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                placeholder="0"
                label="Longitud °"
                step={0.00001}
                precision={5}
                {...form.getInputProps("longitude")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                placeholder="0"
                label="Altitud"
                description="Metros sobre el nivel del mar"
                step={1}
                {...form.getInputProps("elevation")}
              />
            </Grid.Col>
          </Grid>
          <TextInput
            icon={<Plant2 />}
            label="Herbario"
            placeholder="Nombre"
            required
            {...form.getInputProps("herbarium")}
          />
          {props.edit ? null : (
            <DatePicker
              {...form.getInputProps("colectedAt")}
              locale="es"
              label="Fecha de recolección"
              required
              mt={20}
            />
          )}

          <Title order={4} mb="md" mt="md">
            Notas Adicionales
          </Title>
          <RichTextEditor
            {...form.getInputProps("aditionalNotes")}
            placeholder="Notas"
          />

          <InputWrapper
            label="Arrastra o ingresa las imágenes correspondientes al registro"
            error={form.errors.documents}
            mt="md"
          >
            <DropFiles
              filesKeys={filesKeys}
              dispatchFilesKeys={dispatchFilesKeys}
              setUploadingFilesToAWS={setUploadingFilesToAWS}
            />
            {filesKeys.length > 0 && (
              <>
                <Text weight={500} mt="lg" mb="sm" size="sm">
                  Archivos subidos
                </Text>
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                      <FiCheckCircle size={16} />
                    </ThemeIcon>
                  }
                >
                  {filesKeys.map((item: any, id: any) => (
                    <Grid key={id}>
                      <Grid.Col span={10}>
                        <List.Item>{item.split("/").slice(-1)[0]}</List.Item>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <ActionIcon
                          variant="outline"
                          color="red"
                          onClick={() =>
                            dispatchFilesKeys({
                              type: "delete",
                              payload: item,
                            })
                          }
                        >
                          <FiTrash />
                        </ActionIcon>
                      </Grid.Col>
                    </Grid>
                  ))}
                </List>
              </>
            )}
          </InputWrapper>
          <Group position="right" mt="md">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={uploadingFilesToAWS}>
              {props.edit ? "Actualizar" : "Crear"}
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
}

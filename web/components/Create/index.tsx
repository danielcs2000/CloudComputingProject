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
  MultiSelect,
} from "@mantine/core";
import { useForm, formList, FormList } from "@mantine/form";
import { useEffect, useReducer, useState } from "react";
import { Trash } from "tabler-icons-react";
import { RichTextEditor } from "@mantine/rte";
import { useRouter } from "next/router";
import TaxonomySelect from "./_taxonomySelect";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { randomId } from "@mantine/hooks";
import { DropFiles } from "../DropFiles";
import { FiCheckCircle, FiTrash } from "react-icons/fi";
import departments from "./_data";

interface FormValues {
  name: string;
  names: FormList<{ value: string; key: string }>;
  morphology: string;
  habitad: string;
  iucnCode: string;
  iucnUrl: string;
  citiesCode: string;
  citiesUrl: string;
  nationalNormative: string;
  observation: string;
  departments: string[];
  photoUrls: string[];
  genreId: string;
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

export default function EspecieForm(props: any) {
  const router = useRouter();

  const [uploadingFilesToAWS, setUploadingFilesToAWS] = useState(false);
  const [filesKeys, dispatchFilesKeys] = useReducer(reducer, []);
  const edit = props.edit;

  useEffect(() => {
    form.setFieldValue("photoUrls", filesKeys);
  }, [filesKeys]);

  useEffect(() => {
    if (edit) {
      dispatchFilesKeys({
        type: "replace",
        payload: speciesData.photoUrls,
      });
    }
  }, [props?.data?.photoUrls, edit]);

  console.log("Data editar:", props);
  let speciesData = props?.data;
  let nameList: { value: string; key: string }[] = [];

  if (speciesData) {
    const names: [] = speciesData.names;
    names.map((item) => nameList.push({ value: item, key: randomId() }));
  } else {
    speciesData = {};
  }

  const form = useForm<FormValues>({
    initialValues: {
      name: speciesData.name || "",
      names: formList(nameList) || formList([]),
      morphology: speciesData.morphology || "",
      habitad: speciesData.habitad || "",
      iucnCode: speciesData.iucnCode || "",
      iucnUrl: speciesData.iucnUrl || "",
      citiesCode: speciesData.citiesCode || "",
      citiesUrl: speciesData.citiesUrl || "",
      nationalNormative: speciesData.nationalNormative || "",
      observation: speciesData.observation || "",
      photoUrls: speciesData.photoUrls || [],
      genreId: speciesData.genreId || "",
      departments: speciesData.departments || [],
    },

    validate: {
      name: (value) => (value !== "" ? null : "Name must not be empty"),
    },
  });
  console.log("form values", form.values);

  const nameFields = form.values.names.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="Nuevo nombre"
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps("names", index, "value")}
      />

      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem("names", index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  async function handleSubmit(values: typeof form.values) {
    try {
      var names = values.names.map((item) => item.value);
      const body = { ...values, names: names };
      console.log(body);

      if (edit) {
        let speciesId = props?.idGet;
        const { data } = await axios.put("/api/species/" + speciesId, body);
        console.log(JSON.stringify(data, null, 4));
        showNotification({
          title: "¡Actualizado!",
          message: "Se actualizó correctamente la especie",
          color: "lime",
        });
        router.back();
        return data;
      } else {
        const { data } = await axios.post("/api/species", body);
        console.log(JSON.stringify(data, null, 4));
        showNotification({
          title: "¡Creado!",
          message: "Se creó correctamente la especie",
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
          message: "No se pudo crear la especie",
          color: "red",
        });
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        showNotification({
          title: "¡Error!",
          message: "No se pudo crear la especie",
          color: "red",
        });
        return "An unexpected error occurred";
      }
    }
  }

  return (
    <>
      <Title order={1} pb="md">
        {edit ? "Editar Especie" : "Crear Especie"}
      </Title>
      <Box sx={{ maxWidth: 1000 }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {edit ? null : (
            <TaxonomySelect inputProps={form.getInputProps("genreId")} />
          )}
          <MultiSelect
            {...form.getInputProps("departments")}
            data={departments}
            label={"Ingresa los departamentos donde se encuentra la especie"}
            placeholder={"Departamentos"}
            pt="md"
            required
          />
          <TextInput
            required
            label="Nombre"
            placeholder="Nombre de la especie"
            {...form.getInputProps("name")}
            pt="md"
          />
          {nameFields.length > 0 ? (
            <Group mb="xs">
              <Text weight={500} size="sm" sx={{ flex: 1 }} pt="md">
                Nombres conocidos
              </Text>
            </Group>
          ) : (
            <div>
              <Text weight={500} size="sm" sx={{ flex: 1 }} pt="md">
                Nombres conocidos
              </Text>

              <Group mt="xs">
                <TextInput
                  disabled
                  placeholder="Ningún nombre"
                  required
                  sx={{ flex: 1 }}
                />
              </Group>
            </div>
          )}

          {nameFields}

          <Group position="center" mt="md">
            <Button
              onClick={() =>
                form.addListItem("names", { value: "", key: randomId() })
              }
              variant="outline"
            >
              Agregar un nombre conocido
            </Button>
          </Group>

          <Title order={2} mb="md">
            Hábitat
          </Title>
          <RichTextEditor
            {...form.getInputProps("habitad")}
            mb="md"
            placeholder="Hábitat"
          />

          <Title order={2} mb="md">
            Morfología
          </Title>
          <RichTextEditor
            {...form.getInputProps("morphology")}
            placeholder="Morfología"
          />

          <Title order={2} mb="md" mt="xl">
            Categorización
          </Title>

          <Title order={3} mb="xs" mt="md">
            IUCN
          </Title>
          <Group grow>
            <TextInput
              label="Enlace IUCN"
              placeholder="Link"
              type="url"
              {...form.getInputProps("iucnUrl")}
            />
            <TextInput
              label="Código IUCN"
              placeholder="Código"
              {...form.getInputProps("iucnCode")}
            />
          </Group>

          <Title order={3} mb="xs" mt="md">
            CITES
          </Title>
          <Group grow>
            <TextInput
              label="Enlace CITES"
              placeholder="Link"
              type="url"
              {...form.getInputProps("citiesUrl")}
            />
            <TextInput
              label="Código CITES"
              placeholder="Código"
              {...form.getInputProps("citiesCode")}
            />
          </Group>

          <Title order={2} mb="md" mt="xl">
            Imágenes
          </Title>
          <InputWrapper
            label="Adjunta las imagenes de la especie"
            description="Recuerda que la primera imagen se usará como portada."
            required
            error={form.errors.documents}
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
              {edit ? "Editar" : "Crear"}
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
}

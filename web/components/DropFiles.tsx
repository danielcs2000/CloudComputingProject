import { Group, Text, useMantineTheme, MantineTheme } from "@mantine/core";
import { Dropzone, DropzoneStatus, MIME_TYPES } from "@mantine/dropzone";
import axios from "axios";
import { useState } from "react";
import { IconType } from "react-icons";
import { FiUpload, FiX } from "react-icons/fi";
import { AiOutlineFilePdf, AiFillCamera } from "react-icons/ai";
import Swal from "sweetalert2";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<IconType> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <FiUpload {...props} />;
  }

  if (status.rejected) {
    return <FiX {...props} />;
  }

  return <AiFillCamera {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group
    position="center"
    spacing="lg"
    style={{ minHeight: 100, pointerEvents: "none" }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={60}
    />

    <div>
      <Text size="lg" inline>
        Arrastra las imágenes o haz click aquí para subir
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Adjunta todas las imágenes que deseas, cada archivo no debe exceder de
        5mb
      </Text>
    </div>
  </Group>
);

export function DropFiles(props: any) {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  return (
    <Dropzone
      loading={loading}
      name="Ingrese las imágenes"
      onDrop={(files: File[]) => {
        files.forEach((file: File) => {
          setLoading(true);
          props.setUploadingFilesToAWS(true);
          axios
            .post("/api/aws/upload/url", {
              file: file.name,
              fileType: file.type,
            })
            .then(function (serverResponse) {
              const { url, fields } = serverResponse.data;
              const formData = new FormData();
              Object.entries({ ...fields, file }).forEach(
                ([key, value]: any) => {
                  formData.append(key, value);
                }
              );
              axios({
                method: "POST",
                url: url,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
              })
                .then(function (response) {
                  props.dispatchFilesKeys({
                    type: "append",
                    payload: fields.key,
                  });
                  console.log(response);
                })
                .catch(function (response) {
                  //handle error
                  console.log(response);
                })
                .finally(() => {
                  setLoading(false);
                  props.setUploadingFilesToAWS(false);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log("accepted file", file);
        });
      }}
      onReject={() =>
        Swal.fire({
          title: "Archivo muy pesado",
          icon: "error",
          text: "El archivo seleccionado no debe exceder de 100mb.",
        })
      }
      maxSize={100 * 1024 ** 2}
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
}

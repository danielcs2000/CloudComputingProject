import {
  ActionIcon,
  Avatar,
  Button,
  Grid,
  Group,
  Modal,
  Paper,
  Select,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useState } from "react";
import { Edit, Mail, Trash } from "tabler-icons-react";
import styles from "../../styles/User.module.css";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

export default function Card(props: any) {
  const [opened, setOpened] = useState(false);
  const [opened1, setOpened1] = useState(false);
  const [role, setRole] = useState(props.role);

  const roles = [
    { value: "GUEST", label: "GUEST" },
    { value: "EDITOR", label: "EDITOR" },
    { value: "ADMIN", label: "ADMIN" },
  ];

  async function handleDelete() {
    try {
      const { data } = await axios.delete("/api/usuarios/" + props.id);

      console.log(JSON.stringify(data, null, 4));
      setOpened(false);
      showNotification({
        title: "¡Eliminado!",
        message: "Se eliminó correctamente el usuario",
        color: "lime",
      });
      props.mutate();

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        showNotification({
          title: "¡Error!",
          message: "No se pudo eliminar el usuario",
          color: "red",
        });
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        showNotification({
          title: "¡Error!",
          message: "No se pudo eliminar el usuario",
          color: "red",
        });
        return "An unexpected error occurred";
      }
    }
  }

  async function handleSubmit() {
    try {
      const body = {
        id: props.id,
        role: role,
      };
      console.log("send", body);

      const { data } = await axios.patch(
        "/api/usuarios/" + props.id,
        body
      );
      setOpened1(false);

      console.log("updated", JSON.stringify(data, null, 4));
      showNotification({
        title: "¡Actualizado!",
        message: "Se editó la información correctamente",
        color: "lime",
      });
      props.mutate();
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        showNotification({
          title: "¡Error!",
          message: "No se pudo actualizar",
          color: "red",
        });
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        showNotification({
          title: "¡Error!",
          message: "No se pudo actualizar",
          color: "red",
        });
        return "An unexpected error occurred";
      }
    }
  }


  return (
    <Paper className={styles.cardUser} p="md" shadow="md">
      <Grid>
        <Grid.Col lg={6}>
          {" "}
          <Group>
            <Avatar src={props.img} radius="xl" />
            {props.name}
          </Group>
          <Group className={styles.email} mt={10} ml={3}>
            <ThemeIcon variant="outline" size="lg">
              <Mail size={25} />
            </ThemeIcon>
            <Text color="gray" ml={3}>
              {props.email}
            </Text>
          </Group>
        </Grid.Col>
        <Grid.Col lg={2} className={styles.role}>
          <Text weight={700}>Rol</Text>
          <div className={styles.textRoles}>
            <Text>{props.role}</Text>
          </div>
        </Grid.Col>
        <Grid.Col lg={4} className={styles.buttons}>
          <Group>
            <Modal
              centered
              opened={opened1}
              onClose={() => setOpened1(false)}
              title="Rol de usuario"
              overlayOpacity={0.55}
            >
              <Select
                data={roles}
                label="Modifica el rol"
                placeholder="Elige uno"
                value={role}
                onChange={setRole}
              />
              <Group position="center" mt={"xl"}>
                <Button onClick={() => setOpened1(false)} variant="outline">
                  Cancelar
                </Button>
                <Button onClick={() => handleSubmit()}>
                  Continuar
                </Button>
              </Group>
            </Modal>
            <ActionIcon
              color="lime"
              variant="filled"
              title="Editar rol"
              onClick={() => setOpened1(true)}
            >
              <Edit size={20} />
            </ActionIcon>
            <Modal
              centered
              opened={opened}
              onClose={() => setOpened(false)}
              title="¡Atención!"
              overlayOpacity={0.55}
            >
              <Text>
                Esta acción eliminará a la especie seleccionada y a todos sus
                registros asociados
              </Text>
              <Group position="center" mt={"xl"}>
                <Button onClick={() => setOpened(false)} variant="outline">
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete()}>
                  Continuar
                </Button>
              </Group>
            </Modal>
            <ActionIcon
              color="red"
              variant="filled"
              onClick={() => setOpened(true)}
              title="Eliminar usuario"
            >
              <Trash size={20} />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

import {
  Card,
  Image,
  Text,
  Button,
  Menu,
  Group,
  Modal,
  Grid,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Roles } from "../../types/role";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Edit, Trash } from "tabler-icons-react";
import styles from "../../styles/Especie.module.css";

export default function ObsCard(props: any) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [opened, setOpened] = useState(false);

  async function handleDelete(observationId: string) {
    try {
      const { data } = await axios.delete(
        "/api/distributions/" + observationId
      );
      console.log(JSON.stringify(data, null, 4));
      showNotification({
        title: "¡Eliminado!",
        message: "Se eliminó correctamente el registro",
        color: "lime",
      });
      setOpened(false);
      props.mutate();
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        showNotification({
          title: "¡Error!",
          message: "No se pudo eliminar el registro",
          color: "red",
        });
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        showNotification({
          title: "¡Error!",
          message: "No se pudo eliminar el registro",
          color: "red",
        });
        return "An unexpected error occurred";
      }
    }
  }

  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image
          src={process.env.AMAZON_BUCKET_URL + props.src}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="sm" mb="sm">
        <Text weight={500}>{props.title}</Text>
      </Group>
      <Grid className={styles.gridButtons}>
        <Grid.Col
          span={session && session.user.role !== Roles.GUEST ? 10 : 12}
          className={styles.gridButtons}
        >
          <Button
            mt="xl"
            fullWidth
            onClick={() =>
              router.push(
                `/especies/${props.idSpecie}/observacion/${props.idObs}/detalles`
              )
            }
            className={styles.gridButtons}
          >
            Ver
          </Button>
        </Grid.Col>
        <Grid.Col span={2}>
          {session && session.user.role !== Roles.GUEST && (
            <>
              <Menu withinPortal shadow="sm" className={styles.gridButtons}>
                <Menu.Item
                  onClick={() =>
                    router.push(
                      `/especies/${props.idSpecie}/observacion/${props.idObs}/editar`
                    )
                  }
                  icon={<Edit size={14} />}
                >
                  Editar
                </Menu.Item>
                <Menu.Item
                  onClick={() => setOpened(true)}
                  icon={<Trash size={14} />}
                  color="red"
                >
                  Eliminar
                </Menu.Item>
              </Menu>

              <Modal
                centered
                opened={opened}
                onClose={() => setOpened(false)}
                title="Atención!"
                overlayOpacity={0.55}
              >
                <Text> Esta acción eliminará el registro seleccionado</Text>
                <Group position="center" mt={"xl"}>
                  <Button onClick={() => setOpened(false)} variant="outline">
                    Cancelar
                  </Button>
                  <Button onClick={() => handleDelete(props.idObs)}>
                    Continuar
                  </Button>
                </Group>
              </Modal>
            </>
          )}
        </Grid.Col>
      </Grid>
    </Card>
  );
}

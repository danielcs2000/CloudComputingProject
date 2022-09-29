import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Modal,
  Menu,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useStyles } from "../../utils/styles";
import { useSession } from "next-auth/react";
import { Roles } from "../../types/role";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Edit, Trash } from "tabler-icons-react";
import styles from "../../styles/Especie.module.css";

export default function CactusCard(props: any) {
  const { classes } = useStyles();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  async function handleDelete(specieId: string) {
    try {
      const { data } = await axios.delete("/api/species/" + specieId);
      console.log(JSON.stringify(data, null, 4));
      showNotification({
        title: "¡Eliminado!",
        message: "Se eliminó correctamente la especie",
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

  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image
          src={process.env.AMAZON_BUCKET_URL + props.src}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="sm" mb="sm" className={classes.italicWord}>
        <Text weight={500}>{props.title} </Text>
      </Group>
      <Grid className={styles.gridButtons}>
        <Grid.Col
          span={session && session.user.role !== Roles.GUEST ? 10 : 12}
          className={styles.gridButtons}
        >
          <Button
            mt="xl"
            onClick={() => router.push(`/especies/${props.idC}/detalles`)}
            fullWidth
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
                  onClick={() => router.push(`/especies/${props.idC}/editar`)}
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
                  <Button onClick={() => handleDelete(props.idC)}>
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

import React from "react";
import { Container, Alert, Button, Group } from "@mantine/core";

import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export function Unauthorized(props: any) {
  const router = useRouter();
  if (props.isGuest === true)
    return (
      <Container my="xs" pt="xl">
        <Alert title="¡No autorizado!" color="orange">
          {props.user.name}, no te encuentras autorizado de ingresar a esta
          página con el email
          {props.user.email}. Si crees que es un error, por favor contácta con
          el soporte.
        </Alert>
        <Group>
          <Button variant="default" mt="lg" onClick={() => signOut()}>
            Log out
          </Button>
          <Button
            variant="default"
            color="green"
            mt="lg"
            onClick={() => router.back()}
          >
            Retroceder
          </Button>
        </Group>
      </Container>
    );
  return (
    <Container my="xs" pt="xl">
      <Alert title="¡No autorizado!" color="red">
        {props.user.name}, No estás autorizado a ingresar a esta página, si
        crees que es un error contacta al soporte.
      </Alert>
      <Group>
        <Button variant="default" mt="lg" onClick={() => signOut()}>
          Log out
        </Button>
        <Button
          variant="default"
          color="green"
          mt="lg"
          onClick={() => router.back()}
        >
          Retroceder
        </Button>
      </Group>
    </Container>
  );
}

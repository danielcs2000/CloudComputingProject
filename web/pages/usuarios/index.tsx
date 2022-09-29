import React from "react";
import Principal from "../../components/Shell";
import { NextPageWithAuth } from "../../types/nextPageAuth";
import { Roles } from "../../types/role";
import dynamic from "next/dynamic";
import { Container } from "@mantine/core";
const Users = dynamic(() => import("../../components/Users"), {
  ssr: false,
});
const Usuarios: NextPageWithAuth = () => {
  return (
    <Principal>
      <Container mt="lg" size="xl">
        <Users/>
      </Container>
    </Principal>
  );
};
Usuarios.auth = { role: Roles.ADMIN };


export default Usuarios;
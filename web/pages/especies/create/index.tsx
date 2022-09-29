import React from "react";
import Principal from "../../../components/Shell";
import { NextPageWithAuth } from "../../../types/nextPageAuth";
import { Roles } from "../../../types/role";
import dynamic from "next/dynamic";
import { Container } from "@mantine/core";
const Editor = dynamic(() => import("../../../components/Create"), {
  ssr: false,
});
const Especies: NextPageWithAuth = () => {
  return (
    <Principal>
      <Container mt="lg" size="xl">
        <Editor edit={false} />
      </Container>
    </Principal>
  );
};
Especies.auth = { role: Roles.EDITOR };

export default Especies;

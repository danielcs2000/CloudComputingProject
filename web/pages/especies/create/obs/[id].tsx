import React from "react";
import Principal from "../../../../components/Shell";
import { NextPageWithAuth } from "../../../../types/nextPageAuth";
import { Roles } from "../../../../types/role";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Container } from "@mantine/core";

const Editor = dynamic(() => import("../../../../components/CreateObs"), {
  ssr: false,
});

const Especies: NextPageWithAuth = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Principal>
      <Container mt="lg" size="xl">
        <Editor speciesId={id} edit={false} />
      </Container>
    </Principal>
  );
};
Especies.auth = { role: Roles.EDITOR };

export default Especies;

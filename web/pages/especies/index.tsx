import React from "react";
import Principal from "../../components/Shell";
import Grilla from "../../components/Grilla";
import { Container } from "@mantine/core";

export default function Especies() {
  return (
    <Principal>
      <Container mt="lg" size="xl">
        <Grilla />
      </Container>
    </Principal>
  );
}

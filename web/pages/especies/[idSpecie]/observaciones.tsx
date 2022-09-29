import GrillaObs from "../../../components/Observacion";
import Principal from "../../../components/Shell";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import React from "react";
import { Container } from "@mantine/core";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string = context.params?.idSpecie as string;
  return {
    props: {
      idGet: id,
    },
  };
};

export default function Observacion(props: any) {
  const router = useRouter();

  return (
    <>
      <Principal>
        <Container mt="lg" size="xl">
          <GrillaObs id={props.idGet} />
        </Container>
      </Principal>
    </>
  );
}

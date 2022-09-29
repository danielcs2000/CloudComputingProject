import React from "react";
import Principal from "../../../components/Shell";
import { NextPageWithAuth } from "../../../types/nextPageAuth";
import { Roles } from "../../../types/role";
import dynamic from "next/dynamic";
import { Container } from "@mantine/core";
import { GetServerSideProps } from "next";
import prisma from "../../../utils/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string = context.params?.idSpecie as string;

  const especie = await prisma.species.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      names: true, // all known names
      morphology: true,
      habitad: true,
      iucnCode: true,
      iucnUrl: true,
      citiesCode: true,
      citiesUrl: true,
      nationalNormative: true,
      observation: true,
      photoUrls: true,
      departments: true,
      genreId: true,
    },
  });

  return {
    props: {
      idGet: id,
      data: especie,
    },
  };
};

const Editor = dynamic(() => import("../../../components/Create"), {
  ssr: false,
});

const Especies: NextPageWithAuth = (props: any) => {
  return (
    <Principal>
      <Container mt="lg" size="xl">
        <Editor edit={true} {...props} />
      </Container>
    </Principal>
  );
};
Especies.auth = { role: Roles.EDITOR };

export default Especies;

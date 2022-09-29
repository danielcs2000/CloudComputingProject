import React from "react";
import Principal from "../../../../../components/Shell";
import { NextPageWithAuth } from "../../../../../types/nextPageAuth";
import { Roles } from "../../../../../types/role";
import dynamic from "next/dynamic";
import { Container } from "@mantine/core";
import { GetServerSideProps } from 'next';
import prisma from "../../../../../utils/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string = context.params?.idObs as string;
  const idSpecie: string = context.params?.idSpecie as string;
  const distributions = await prisma.distribution.findUnique({
    where: {
      id: id,
    },
    select: {
      department: true,
      province: true,
      location: true,
      elevation: true,
      longitude: true,
      latitude: true,
      colector: true,
      colectionNumber: true,
      colectedAt: false,
      herbarium: true,
      aditionalNotes: true,
      photoUrls: true,
    }
  })
  return {
    props: {
      idObs: id,
      data: distributions,
      idSpecie: idSpecie,
    }
  }
}

const Editor = dynamic(() => import("../../../../../components/CreateObs"), {
  ssr: false,
});

const Especies: NextPageWithAuth = (props: any) => {
  return (
    <Principal>
      <Container mt="lg" size="xl">
        <Editor speciesId={props.idSpecie} obsId={props.idObs} data={props.data} edit={true} />
      </Container>
    </Principal>
  );
};
Especies.auth = { role: Roles.EDITOR };

export default Especies;
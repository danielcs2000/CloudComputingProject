import React from "react";
import Principal from "../../../components/Shell";
import Especie from "../../../components/Especie";
import { Container } from "@mantine/core";
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps= async(context)=>{
  const id:string = context.params?.idSpecie as string
  return{
    props:{
      idGet:id,
    }
  }
}

export default function Especies(props:any) {
  return (
    <Principal>
      <Container mt="lg" size="xl">
        <Especie id={props.idGet} />
      </Container>
    </Principal>
  );
}

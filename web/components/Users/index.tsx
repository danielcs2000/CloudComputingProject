import { Container, LoadingOverlay, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { GetUsers } from "../../types/users";
import Card from "./_card";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function User() {
  const response = useSWR("/api/usuarios/", fetcher);
  const data = response.data as GetUsers;
  const error = response.error;

  if (error) return <div>Fallo al cargar</div>;
  if (!data) return <LoadingOverlay visible={true} />;

  return (
    <>
      <Title>Usuarios</Title>
      <Container>
        {data.map((dato) => (
          <Card
            mutate={response.mutate}
            key={dato.id}
            id={dato.id}
            name={dato.name}
            img={dato.image}
            email={dato.email}
            role={dato.role}
          />
        ))}
      </Container>
    </>
  );
}

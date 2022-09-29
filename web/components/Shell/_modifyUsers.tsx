import React from "react";
import {
  User,
} from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { useRouter } from "next/router";


export default function Usuarios() {
    const router = useRouter();
    return(
        <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,
      
          "&:hover": {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Group onClick={() => router.push("/usuarios")}>
          <ThemeIcon color="blue" variant="light">
            <User size={16}/>
          </ThemeIcon>
      
          <Text size="sm">Usuarios</Text>
        </Group>
      </UnstyledButton>
    );
}
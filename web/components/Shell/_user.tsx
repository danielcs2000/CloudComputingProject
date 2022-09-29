import React from "react";
import { ChevronRight, ChevronLeft } from "tabler-icons-react";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";

export default function User() {
  const theme = useMantineTheme();
  const { data: session } = useSession();

  if (!session) {
    return (
      <Box
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `1px solid ${theme.colors.gray[2]}`,
        }}
      >
        <UnstyledButton
          sx={{
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.black,

            "&:hover": {
              backgroundColor: theme.colors.gray[0],
            },
          }}
        >
          <Group onClick={() => signIn("google")}>
            <Avatar
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              radius="xl"
            />
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                Iniciar Sesión
              </Text>
            </Box>

            {theme.dir === "ltr" ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </Group>
        </UnstyledButton>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <UnstyledButton
          sx={{
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          }}
        >
          <Group onClick={() => signOut()}>
            <Avatar src={session.user?.image} radius="xl" />
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {session.user?.name}
              </Text>
              <Text color="dimmed" size="xs">
                {session.user?.email}
              </Text>
            </Box>

            {theme.dir === "ltr" ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </Group>
        </UnstyledButton>
      </Box>
    );
  }
}

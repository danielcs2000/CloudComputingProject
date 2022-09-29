import React, { useState } from "react";
import { Plant } from "tabler-icons-react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import dynamic from "next/dynamic";
import MainLinks from "./_mainLinks";
import { useSession } from "next-auth/react";
import Usuarios from "./_modifyUsers";
const UserPostCarga = dynamic(() => import("./_user"), { ssr: false });

export default function Principal(props: any) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data: session } = useSession();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow mt="xs">
            <MainLinks />
            {session?.user.role === "ADMIN"?
              <Usuarios/>:null}
          </Navbar.Section>
          <Navbar.Section>
            <UserPostCarga />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Plant size={30} />
            <Text>Cactus Net</Text>
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}

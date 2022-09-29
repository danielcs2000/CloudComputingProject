import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  MantineProvider,
  LoadingOverlay,
  MantineThemeOverride,
} from "@mantine/core";
import { SessionProvider, useSession } from "next-auth/react";
import { Unauthorized } from "../components/Unauthorized";
import React from "react";
import router from "next/router";
import { Roles } from "../types/role";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { NextComponentType, NextPageContext } from "next/types";
import { NotificationsProvider } from "@mantine/notifications";
import { NextPageWithAuth } from "../types/nextPageAuth";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> &
  Partial<NextPageWithAuth>;

type AppPropsWithAuth<P = {}> = AppProps<P> & {
  Component: NextComponentWithAuth;
};

const myTheme: MantineThemeOverride = {
  primaryColor: "lime",
  colorScheme: "light",
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
  return (
    <>
      <Head>
        <title>CactusNet</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
        <NotificationsProvider>
          <SessionProvider session={session}>
            {Component.auth?.role && Component.auth.role !== Roles.GUEST ? (
              <Auth pageAccessLevel={Component.auth.role}>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </SessionProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

function Auth({
  pageAccessLevel,
  children,
}: {
  pageAccessLevel: any;
  children: any;
}) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === "loading") return;
    if (!isUser) router.push("/admin/login");
  }, [isUser, status]);
  console.log("aaaa", isUser)
  if (isUser) {
    console.log("session.user.role", session.user.role);
    console.log("pageAccessLevel", pageAccessLevel);
    if (
      session.user.role === Roles.ADMIN ||
      session.user.role === pageAccessLevel
    ) {
      return children;
    } else {
      return (
        <Unauthorized
          user={session.user}
          isGuest={session.user.role === Roles.GUEST}
        />
      );
    }
  }

  return <LoadingOverlay visible={true} />;
}

export default MyApp;

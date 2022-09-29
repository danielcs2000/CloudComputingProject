import type { NextPage } from "next";
import { Roles } from "./role";

type PageAuth = {
    role: Roles;
    // loading: JSX.Element;
    // unauthorized: JSX.Element;
};

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
    auth: PageAuth;
};
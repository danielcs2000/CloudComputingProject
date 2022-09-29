import { DefaultSession } from "next-auth";
import { Roles } from "./role";
declare module "next-auth" {
  interface Session {
    user: {
      role: Roles;
      email: string;
      name: string;
      image: string;
    };
  }
}
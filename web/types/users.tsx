export type GetUsers = {
    name: string;
    id: string;
    email: string;
    image: string;
    role: string;
  }[];

  export type Role = {
    id: string;
    role: string;
  }
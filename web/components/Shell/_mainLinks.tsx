import React from "react";
import {
  Plant,
  Home,
  QuestionMark,
  BrandWhatsapp,
  Route,
  User,
} from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { useRouter } from "next/router";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  route: string;
}

function MainLink({ icon, color, label, route }: MainLinkProps) {
  const router = useRouter();
  return (
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
      <Group onClick={() => router.push(route)}>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <Home size={16} />, 
    color: "blue", 
    label: "Inicio", 
    route: "/" },
  {
    icon: <Plant size={16} />,
    color: "teal",
    label: "Especies",
    route: "/especies",
  },
  {
    icon: <QuestionMark size={16} />,
    color: "violet",
    label: "¿Quiénes somos?",
    route: "/especies",
  },
  {
    icon: <BrandWhatsapp size={16} />,
    color: "green",
    label: "Contáctanos",
    route: "/especies",
  },
];

export default function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

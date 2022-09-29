import { Button, Title, Box } from "@mantine/core";
import Menu from "./_menu";
import Elements from "./_elements";
import { FilePlus } from "tabler-icons-react";
import { useRouter } from "next/router";
import { Roles } from "../../types/role";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Grilla() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuParams, setMenuParams] = useState({
    genreId: "",
    tribeId: "",
    subFamilyId: "",
  });

  function crear() {
    router.push("/especies/create");
  }

  return (
    <>
      <Box pb="xs">
        <Menu menuParams={menuParams} setMenuParams={setMenuParams} />
      </Box>
      <Box>
        <Title mb="md">Especies</Title>
        {session && session.user.role !== Roles.GUEST && (
          <Button
            mb={20}
            size="md"
            leftIcon={<FilePlus size={25} strokeWidth={2} color={"white"} />}
            onClick={() => crear()}
          >
            Agregar una nueva especie
          </Button>
        )}
        <Elements filters={menuParams} onFiltersChange={setMenuParams} />
      </Box>
    </>
  );
}

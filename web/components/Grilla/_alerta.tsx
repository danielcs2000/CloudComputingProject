import { Alert } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";

export default function Alerta() {
  return (
    <Alert
      icon={<AlertCircle size={16} />}
      title="No existen elementos"
      color="yellow"
      // variant="filled"
      mt={20}
    >
      No existen elementos con dicha busqueda.
    </Alert>
  );
}

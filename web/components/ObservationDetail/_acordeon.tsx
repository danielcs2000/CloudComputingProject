import {
  Accordion,
  Anchor,
  List,
  ThemeIcon,
  TypographyStylesProvider,
} from "@mantine/core";
import { CircleCheck } from "tabler-icons-react";
import styles from "../../styles/Especie.module.css"

export default function Acordeon(props: any) {
  return (
    <Accordion
      multiple
      styles={{
        itemTitle: { marginTop: "0px !important" },
      }}
      initialItem={0}
    >
      <Accordion.Item label="Número de recolección">
      {props.coleccion}
      </Accordion.Item>
      <Accordion.Item label="Herbario">
        {props.herbario}
      </Accordion.Item>
      <Accordion.Item label="Fecha de recolección" >
        <div className={styles.Col1}>{props.children}</div>
      </Accordion.Item>

    </Accordion>
  );
}

import {
  Accordion,
  Anchor,
  List,
  ThemeIcon,
  TypographyStylesProvider,
} from "@mantine/core";
import { CircleCheck } from "tabler-icons-react";

export default function Acordeon(props: any) {
  return (
    <Accordion
      multiple
      styles={{
        itemTitle: { marginTop: "0px !important" },
      }}
      initialItem={0}
    >
      <Accordion.Item label="Morfología">
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: `${props.morph}` }} />
        </TypographyStylesProvider>
      </Accordion.Item>

      <Accordion.Item label="Hábitat">
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: `${props.habitad}` }} />
        </TypographyStylesProvider>
      </Accordion.Item>
      {props.uiCode !== "" && props.citiesURL !== "" && (
        <Accordion.Item label="Categorización" mt={0}>
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            }
          >
            {props.uiCode !== "" && (
              <List.Item>
                IUCN:
                <Anchor href={props.uicnURL} target="_blank">
                  {" " + props.uiCode}
                </Anchor>
              </List.Item>
            )}
            {props.citiesCode !== "" && (
              <List.Item>
                CITES:
                <Anchor href={props.citiesURL} target="_blank">
                  {" " + props.citiesCode}
                </Anchor>
              </List.Item>
            )}
          </List>
        </Accordion.Item>
      )}
      {props.names.length !== 0 ? (
        <Accordion.Item label="Nombres conocidos">
          <List>
            {props.names.map((name: string, index: any) => (
              <List.Item key={index}>{name}</List.Item>
            ))}
          </List>
        </Accordion.Item>
      ) : null}
    </Accordion>
  );
}

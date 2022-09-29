import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timeline, Text } from "@mantine/core";
import {
  faMountainCity,
  faLocationDot,
  faEarthAmericas
} from "@fortawesome/free-solid-svg-icons";

export default function TimeLine(props: any) {
  return (
    <Timeline
      active={4}
      bulletSize={30}
      lineWidth={2}
      align="right"
      mt={10}
      mb={15}
    >
      <Timeline.Item
        bullet={
          <FontAwesomeIcon icon={faEarthAmericas} style={{ fontSize: 17 }} />
        }
        title={`${props.department}`}
      >
        <Text color="dimmed" size="sm">
          Departamento
        </Text>
      </Timeline.Item>

      <Timeline.Item
        title={props.province === ""? "No registrado": props.province}
        bullet={
          <FontAwesomeIcon icon={faMountainCity} style={{ fontSize: 17 }} />
        }
      >
        <Text color="dimmed" size="sm">
          Provincia
        </Text>
      </Timeline.Item>

      <Timeline.Item
        title={props.location === ""? "No registrado": props.location}
        bullet={
          <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 17 }} />
        }
      >
        <Text color="dimmed" size="sm">
          Locación
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}

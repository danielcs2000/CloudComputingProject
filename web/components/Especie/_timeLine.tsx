import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timeline, Text } from "@mantine/core";
import {
  faCampground,
  faHouseChimneyWindow,
  faPeopleRoof,
  faLeaf,
  faMarsAndVenus,
} from "@fortawesome/free-solid-svg-icons";
import { useStyles } from "../../utils/styles";

export default function TimeLine(props: any) {
  const { classes } = useStyles();

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
          <FontAwesomeIcon
            icon={faHouseChimneyWindow}
            style={{ fontSize: 17 }}
          />
        }
        title={`${props.family_name}`}
      >
        <Text color="dimmed" size="sm">
          Familia
        </Text>
      </Timeline.Item>

      <Timeline.Item
        bullet={
          <FontAwesomeIcon icon={faPeopleRoof} style={{ fontSize: 17 }} />
        }
        title={`${props.subfamily_name}`}
      >
        <Text color="dimmed" size="sm">
          SubFamilia
        </Text>
      </Timeline.Item>

      <Timeline.Item
        title={`${props.tribe_name}`}
        bullet={
          <FontAwesomeIcon icon={faCampground} style={{ fontSize: 17 }} />
        }
      >
        <Text color="dimmed" size="sm">
          Tribu
        </Text>
      </Timeline.Item>

      <Timeline.Item
        className={classes.italicWord}
        title={`${props.genre_name}`}
        bullet={
          <FontAwesomeIcon icon={faMarsAndVenus} style={{ fontSize: 17 }} />
        }
      >
        <Text color="dimmed" size="sm">
          Género
        </Text>
      </Timeline.Item>

      <Timeline.Item
        className={classes.italicWord}
        title={`${props.especie_name}`}
        bullet={<FontAwesomeIcon icon={faLeaf} style={{ fontSize: 17 }} />}
      >
        <Text color="dimmed" size="sm">
          Especie
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}

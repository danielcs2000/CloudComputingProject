import { Chips, Chip } from '@mantine/core';

export default function ChipsPlant() {
    return (
      <Chips 
        style={{justifyContent: 'center'}}
      >
        <Chip value="react">Filtro 1</Chip>
        <Chip value="ng">Filtro 2</Chip>
        <Chip value="svelte">Filtro 3</Chip>
        <Chip value="vue">Filtro 4</Chip>
      </Chips>
    );
  }
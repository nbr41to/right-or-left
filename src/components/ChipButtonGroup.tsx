'use client';

import { Button } from '@mantine/core';
import { Chip } from './Chip';

type Props = {
  selected: Chips;
  onClick: (color: Color) => void;
};

export const ChipButtonGroup = ({ selected, onClick }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <Button
        variant="outline"
        color="red"
        style={{ borderWidth: '2px' }}
        onClick={() => onClick('red')}
      >
        <Chip color="red" size={32} />
        <span className="text-black ml-2">{selected.red}</span>
      </Button>
      <Button
        variant="outline"
        color="yellow"
        style={{ borderWidth: '2px' }}
        onClick={() => onClick('yellow')}
      >
        <Chip color="yellow" size={32} />
        <span className="text-black ml-2">{selected.yellow}</span>
      </Button>
      <Button
        variant="outline"
        color="blue"
        style={{ borderWidth: '2px' }}
        onClick={() => onClick('blue')}
      >
        <Chip color="blue" size={32} />
        <span className="text-black ml-2">{selected.blue}</span>
      </Button>
      <Button
        variant="outline"
        color="black"
        style={{ borderWidth: '2px' }}
        onClick={() => onClick('black')}
      >
        <Chip color="black" size={32} />
        <span className="text-black ml-2">{selected.black}</span>
      </Button>
    </div>
  );
};

import { Chip } from './Chip';

type Props = {
  chips: Chips;
};

export const ChipCounter = ({ chips }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-3 w-fit mx-auto">
      <div className="flex items-center gap-2">
        <Chip color="red" size={32} />
        <span className="font-bold">{chips.red}</span>
      </div>
      <div className="flex items-center gap-2">
        <Chip color="yellow" size={32} />
        <span className="font-bold">{chips.yellow}</span>
      </div>
      <div className="flex items-center gap-2">
        <Chip color="blue" size={32} />
        <span className="font-bold">{chips.blue}</span>
      </div>
      <div className="flex items-center gap-2">
        <Chip color="black" size={32} />
        <span className="font-bold">{chips.black}</span>
      </div>
    </div>
  );
};

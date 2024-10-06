import { PiCoinFill } from 'react-icons/pi';

type Props = {
  color: Color;
  size?: number;
};

export const Chip = ({ color, size = 32 }: Props) => {
  const colorClass = {
    red: 'fill-red-600',
    yellow: 'fill-yellow-400',
    blue: 'fill-blue-600',
    black: 'fill-gray-800',
  }[color];

  return (
    <PiCoinFill size={size} className={`bg-white rounded-full ${colorClass}`} />
  );
};

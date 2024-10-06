import clsx from 'clsx';

type Props = {
  order: Order;
};

export const CurrentPlayerBar = ({ order }: Props) => {
  return (
    <div
      className={clsx(
        'text-white font-bold text-center',
        order === 'FIRST' && 'bg-red-600',
        order === 'SECOND' && 'bg-blue-600'
      )}
    >
      {order === 'FIRST' && 'player 1'}
      {order === 'SECOND' && 'player 2'}
    </div>
  );
};

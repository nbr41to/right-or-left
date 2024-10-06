import { calcScore, COLOR, SCORE_CONSTANTS } from '@/lib/game-utils';
import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import clsx from 'clsx';
import { Chip } from './Chip';

type Props = {
  player: Player;
};

export const ScoreBoard = ({ player }: Props) => {
  return (
    <div>
      <Table>
        <TableThead>
          <TableTr className="text-center">
            <TableTh></TableTh>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableTh key={index}>
                <div className="w-6 grid place-content-center text-sm font-normal whitespace-nowrap">
                  {index + 1}枚
                </div>
              </TableTh>
            ))}
          </TableTr>
        </TableThead>
        <TableTbody>
          {Object.keys(SCORE_CONSTANTS).map((color) => (
            <TableTr key={color}>
              <TableTd>
                <Chip color={color as Color} size={20} />
              </TableTd>
              {SCORE_CONSTANTS[color as Color]
                .slice(1, 6)
                .map((point, index) => (
                  <TableTd key={index}>
                    <div
                      className={clsx(
                        'size-6 grid place-content-center rounded-full font-bold',
                        color === COLOR.RED &&
                          player.chips[COLOR.RED] === index + 1 &&
                          'bg-red-600 text-white',
                        color === COLOR.YELLOW &&
                          player.chips[COLOR.YELLOW] === index + 1 &&
                          'bg-yellow-500 text-white',
                        color === COLOR.BLUE &&
                          player.chips[COLOR.BLUE] === index + 1 &&
                          'bg-blue-600 text-white',
                        color === COLOR.BLACK &&
                          player.chips[COLOR.BLACK] === index + 1 &&
                          'bg-gray-800 text-white'
                      )}
                    >
                      {point}
                    </div>
                  </TableTd>
                ))}
            </TableTr>
          ))}
          <TableTr>
            <TableTd colSpan={6}>
              <div className="text-center text-lg font-bold">
                合計: {calcScore(player)} point
              </div>
            </TableTd>
          </TableTr>
        </TableTbody>
      </Table>
    </div>
  );
};

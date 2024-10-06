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
import { TbArrowBigRightFilled } from 'react-icons/tb';

type Props = {
  player: Player;
  toEstimate?: Chips;
};

export const ScoreBoard = ({ player, toEstimate }: Props) => {
  const willChips = {
    red: player.chips[COLOR.RED] + (toEstimate?.red ?? 0),
    yellow: player.chips[COLOR.YELLOW] + (toEstimate?.yellow ?? 0),
    blue: player.chips[COLOR.BLUE] + (toEstimate?.blue ?? 0),
    black: player.chips[COLOR.BLACK] + (toEstimate?.black ?? 0),
  };

  return (
    <div>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh></TableTh>
            {Array.from({ length: 6 }).map((_, index) => (
              <TableTh key={index}>
                <div className="w-6 h-min grid place-content-center text-xs/none font-normal whitespace-nowrap">
                  {index}枚
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
              {SCORE_CONSTANTS[color as Color].map((point, index) => (
                <TableTd key={index}>
                  <div
                    className={clsx(
                      'size-6 grid place-content-center rounded-full font-bold',
                      color === COLOR.RED &&
                        player.chips[COLOR.RED] === index &&
                        'bg-red-600 text-white',
                      color === COLOR.RED &&
                        willChips[COLOR.RED] === index &&
                        'border-red-600/60 border-2',
                      color === COLOR.YELLOW &&
                        player.chips[COLOR.YELLOW] === index &&
                        'bg-yellow-400 text-white',
                      color === COLOR.YELLOW &&
                        willChips[COLOR.YELLOW] === index &&
                        'border-yellow-400/60 border-2',
                      color === COLOR.BLUE &&
                        player.chips[COLOR.BLUE] === index &&
                        'bg-blue-600 text-white',
                      color === COLOR.BLUE &&
                        willChips[COLOR.BLUE] === index &&
                        'border-blue-600/60 border-2',
                      color === COLOR.BLACK &&
                        player.chips[COLOR.BLACK] === index &&
                        'bg-gray-800 text-white',
                      color === COLOR.BLACK &&
                        willChips[COLOR.BLACK] === index &&
                        'border-gray-800/60 border-2'
                    )}
                  >
                    {point}
                  </div>
                </TableTd>
              ))}
            </TableTr>
          ))}
          <TableTr style={{ backgroundColor: '#f3f4f6' }}>
            <TableTd colSpan={7}>
              <div className="text-center text-lg font-bold">
                合計: {calcScore(player.chips)} point
                {toEstimate && (
                  <>
                    <TbArrowBigRightFilled
                      className="fill-gray-600 inline-block ml-2 animate-pulse"
                      size={16}
                    />
                    <span className="text-gray-600 ml-2 animate-pulse">
                      {calcScore(willChips)} point
                    </span>
                  </>
                )}
              </div>
            </TableTd>
          </TableTr>
        </TableTbody>
      </Table>
    </div>
  );
};

'use client';

import { Button, Divider } from '@mantine/core';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Box } from './Box';
import { ChipButtonGroup } from './ChipButtonGroup';
import { ChipCounter } from './ChipCounter';

type Props = {
  restChips: Chips;
  gameData: GameData;
  setGameData: Dispatch<SetStateAction<GameData>>;
};

export const SetBoxes = ({ restChips, gameData, setGameData }: Props) => {
  const [currentRestChips, setCurrentRestChips] = useState<Chips>(restChips);
  const [selected, setSelected] = useState<{
    left: Box;
    right: Box;
  }>({
    left: {
      on: { red: 0, yellow: 0, blue: 0, black: 0 },
      in: { red: 0, yellow: 0, blue: 0, black: 0 },
    },
    right: {
      on: { red: 0, yellow: 0, blue: 0, black: 0 },
      in: { red: 0, yellow: 0, blue: 0, black: 0 },
    },
  });
  const totalChips = useMemo(
    () =>
      Object.values(selected.left.on).reduce((acc, cur) => acc + cur, 0) +
      Object.values(selected.left.in).reduce((acc, cur) => acc + cur, 0) +
      Object.values(selected.right.on).reduce((acc, cur) => acc + cur, 0) +
      Object.values(selected.right.in).reduce((acc, cur) => acc + cur, 0),

    [selected]
  );
  const onAnyChips = useMemo(
    () =>
      Object.values(selected.left.on).some((chip) => chip > 0) ||
      Object.values(selected.right.on).some((chip) => chip > 0),
    [selected]
  );

  const incrementBox = useCallback(
    (arg: { box: 'left' | 'right'; position: 'on' | 'in'; color: Color }) => {
      if (totalChips > 4) return;
      const restChips = currentRestChips[arg.color];
      if (restChips < 1) return;
      const { box, position, color } = arg;

      setSelected((prev) => ({
        ...prev,
        [box]: {
          ...prev[box],
          [position]: {
            ...prev[box][position],
            [color]: prev[box][position][color] + 1,
          },
        },
      }));

      setCurrentRestChips((prev) => ({
        ...prev,
        [color]: prev[color] - 1,
      }));
    },
    [totalChips]
  );

  const onChoice = useCallback(
    (box: 'left' | 'right') => {
      const selectedBox = selected[box];
      const unselectedBox = selected[box === 'left' ? 'right' : 'left'];

      setGameData((prev) => {
        const selectPlayerBox =
          prev.turn === 'FIRST' ? prev.firstPlayer : prev.secondPlayer;
        const unselectPlayerBox =
          prev.turn === 'FIRST' ? prev.secondPlayer : prev.firstPlayer;
        const selectPlayerChips = {
          red:
            selectPlayerBox.chips.red + selectedBox.on.red + selectedBox.in.red,
          yellow:
            selectPlayerBox.chips.yellow +
            selectedBox.on.yellow +
            selectedBox.in.yellow,
          blue:
            selectPlayerBox.chips.blue +
            selectedBox.on.blue +
            selectedBox.in.blue,
          black:
            selectPlayerBox.chips.black +
            selectedBox.on.black +
            selectedBox.in.black,
        };

        const unselectPlayerChips = {
          red:
            unselectPlayerBox.chips.red +
            unselectedBox.on.red +
            unselectedBox.in.red,
          yellow:
            unselectPlayerBox.chips.yellow +
            unselectedBox.on.yellow +
            unselectedBox.in.yellow,
          blue:
            unselectPlayerBox.chips.blue +
            unselectedBox.on.blue +
            unselectedBox.in.blue,
          black:
            unselectPlayerBox.chips.black +
            unselectedBox.on.black +
            unselectedBox.in.black,
        };

        const newPlayersData =
          prev.turn === 'FIRST'
            ? ({
                firstPlayer: {
                  order: 'FIRST',
                  chips: selectPlayerChips,
                },
                secondPlayer: {
                  order: 'SECOND',
                  chips: unselectPlayerChips,
                },
              } as const)
            : ({
                firstPlayer: {
                  order: 'FIRST',
                  chips: unselectPlayerChips,
                },
                secondPlayer: {
                  order: 'SECOND',
                  chips: selectPlayerChips,
                },
              } as const);

        return {
          ...prev,
          phase: 'SET',
          restChips: currentRestChips,
          ...newPlayersData,
        };
      });

      /* 初期化 */
      setSelected({
        left: {
          on: { red: 0, yellow: 0, blue: 0, black: 0 },
          in: { red: 0, yellow: 0, blue: 0, black: 0 },
        },
        right: {
          on: { red: 0, yellow: 0, blue: 0, black: 0 },
          in: { red: 0, yellow: 0, blue: 0, black: 0 },
        },
      });
    },
    [selected, currentRestChips]
  );

  return (
    <div className="space-y-2">
      <div className="flex justify-evenly h-[208px]">
        <Box
          animate={gameData.phase === 'SET'}
          chips={selected.left}
          onClick={() => onChoice('left')}
        />
        <Box
          animate={gameData.phase === 'SET'}
          chips={selected.right}
          onClick={() => onChoice('right')}
        />
      </div>

      <Divider />

      <ChipCounter chips={currentRestChips} />

      <Divider />

      <div className="flex gap-2 justify-between">
        <div className="space-y-2">
          <div>
            <div className="text-center">on</div>
            <ChipButtonGroup
              selected={selected.left.on}
              onClick={(color) =>
                incrementBox({ box: 'left', position: 'on', color })
              }
            />
          </div>
          <div>
            <div className="text-center">in</div>
            <ChipButtonGroup
              selected={selected.left.in}
              onClick={(color) =>
                incrementBox({ box: 'left', position: 'in', color })
              }
            />
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="space-y-2">
          <div>
            <div className="text-center">on</div>
            <ChipButtonGroup
              selected={selected.right.on}
              onClick={(color) =>
                incrementBox({ box: 'right', position: 'on', color })
              }
            />
          </div>
          <div>
            <div className="text-center">in</div>
            <ChipButtonGroup
              selected={selected.right.in}
              onClick={(color) =>
                incrementBox({ box: 'right', position: 'in', color })
              }
            />
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        color="gray"
        fullWidth
        onClick={() => {
          setSelected({
            left: {
              on: { red: 0, yellow: 0, blue: 0, black: 0 },
              in: { red: 0, yellow: 0, blue: 0, black: 0 },
            },
            right: {
              on: { red: 0, yellow: 0, blue: 0, black: 0 },
              in: { red: 0, yellow: 0, blue: 0, black: 0 },
            },
          });
          setCurrentRestChips(restChips);
        }}
      >
        Clear
      </Button>

      <Button
        fullWidth
        disabled={totalChips !== 5 || !onAnyChips}
        onClick={() => {
          if (totalChips !== 5) return;
          if (!onAnyChips) return;
          setGameData((prev) => ({
            ...prev,
            turn: prev.turn === 'FIRST' ? 'SECOND' : 'FIRST',
            phase: 'SELECT',
            restChips: currentRestChips,
          }));
        }}
      >
        OK
      </Button>
    </div>
  );
};

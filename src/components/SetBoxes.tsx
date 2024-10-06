'use client';

import { Button, Divider, Space } from '@mantine/core';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Box } from './Box';
import { ChipButtonGroup } from './ChipButtonGroup';
import { ChipCounter } from './ChipCounter';
import { calcTotalChipsBoxes } from '@/lib/game-utils';

type Props = {
  gameData: GameData;
  setGameData: Dispatch<SetStateAction<GameData>>;
};

export const SetBoxes = ({ gameData, setGameData }: Props) => {
  const { settingBoxes, restChips } = gameData;
  const [currentRestChips, setCurrentRestChips] = useState<Chips>(restChips);
  const [opened, setOpened] = useState<'left' | 'right' | null>(null);

  const { total: totalChips, chips: selectedChips } =
    calcTotalChipsBoxes(settingBoxes);
  const onAnyChips =
    Object.values(settingBoxes.left.on).some((chip) => chip > 0) ||
    Object.values(settingBoxes.right.on).some((chip) => chip > 0);

  const incrementBox = useCallback(
    (arg: { box: 'left' | 'right'; position: 'on' | 'in'; color: Color }) => {
      if (totalChips > 4) return;
      const restChips = currentRestChips[arg.color];
      if (restChips < 1) return;
      const { box, position, color } = arg;

      setGameData((prev) => ({
        ...prev,
        settingBoxes: {
          ...prev.settingBoxes,
          [box]: {
            ...prev.settingBoxes[box],
            [position]: {
              ...prev.settingBoxes[box][position],
              [color]: prev.settingBoxes[box][position][color] + 1,
            },
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

  const onChoice = useCallback(() => {
    if (!opened) return;
    const selectedBox = settingBoxes[opened];
    const unselectedBox = settingBoxes[opened === 'left' ? 'right' : 'left'];

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
    setGameData((prev) => ({
      ...prev,
      settingBoxes: {
        left: {
          on: { red: 0, yellow: 0, blue: 0, black: 0 },
          in: { red: 0, yellow: 0, blue: 0, black: 0 },
        },
        right: {
          on: { red: 0, yellow: 0, blue: 0, black: 0 },
          in: { red: 0, yellow: 0, blue: 0, black: 0 },
        },
      },
    }));
    setOpened(null);
  }, [settingBoxes, currentRestChips, opened]);

  return (
    <>
      <div className="space-y-4">
        <div>
          <ChipCounter chips={currentRestChips} />
          <div className="flex justify-evenly h-[208px] border rounded">
            <Box
              animate={gameData.phase === 'SET' || !!opened}
              chips={settingBoxes.left}
              onClick={() => setOpened('left')}
            />
            <Box
              animate={gameData.phase === 'SET' || !!opened}
              chips={settingBoxes.right}
              onClick={() => setOpened('right')}
            />
          </div>
        </div>

        {gameData.phase === 'SELECT' && (
          <div className="text-sm font-bold text-center">
            <p>以下のチップが使用されました。</p>
            <ChipCounter chips={selectedChips} />
            <p>取得する箱を選んでください！</p>
          </div>
        )}

        {gameData.phase === 'SET' && (
          <div>
            <div className="bg-gray-500 text-center text-white">set boxes</div>
            <div className="flex gap-2 justify-between">
              <div className="pb-2">
                <div className="text-center">on box</div>
                <ChipButtonGroup
                  selected={settingBoxes.left.on}
                  onClick={(color) =>
                    incrementBox({ box: 'left', position: 'on', color })
                  }
                />
                <div className="text-center">in box</div>
                <ChipButtonGroup
                  selected={settingBoxes.left.in}
                  onClick={(color) =>
                    incrementBox({ box: 'left', position: 'in', color })
                  }
                />
              </div>

              <Divider orientation="vertical" />

              <div className="pb-2">
                <div className="text-center">on box</div>
                <ChipButtonGroup
                  selected={settingBoxes.right.on}
                  onClick={(color) =>
                    incrementBox({ box: 'right', position: 'on', color })
                  }
                />
                <div className="text-center">in box</div>
                <ChipButtonGroup
                  selected={settingBoxes.right.in}
                  onClick={(color) =>
                    incrementBox({ box: 'right', position: 'in', color })
                  }
                />
              </div>
            </div>

            <Divider />

            <Space h={20} />

            <div className="space-y-4">
              <Button
                variant="outline"
                color="black"
                disabled={totalChips === 0}
                fullWidth
                onClick={() => {
                  if (gameData.phase !== 'SET') return;
                  setGameData((prev) => ({
                    ...prev,
                    settingBoxes: {
                      left: {
                        on: { red: 0, yellow: 0, blue: 0, black: 0 },
                        in: { red: 0, yellow: 0, blue: 0, black: 0 },
                      },
                      right: {
                        on: { red: 0, yellow: 0, blue: 0, black: 0 },
                        in: { red: 0, yellow: 0, blue: 0, black: 0 },
                      },
                    },
                  }));
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
              {totalChips === 5 && !onAnyChips && (
                <p className="text-center text-sm font-bold text-red-500">
                  1枚以上 Box の上に Chip を乗せてください。
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {opened && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen flex justify-center items-center bg-white/50">
          <Button disabled={!opened} onClick={onChoice}>
            選択箱を準備する
          </Button>
        </div>
      )}
    </>
  );
};

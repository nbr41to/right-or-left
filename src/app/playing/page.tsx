'use client';

import { GameStatus } from '@/components/GameStatus';
import { PlayerBar } from '@/components/PlayerBar';
import { SetBoxes } from '@/components/SetBoxes';
import { Divider, Space } from '@mantine/core';
import { useMemo, useState } from 'react';

export default function Page() {
  const [gameData, setGameData] = useState<GameData>({
    turn: 'FIRST',
    phase: 'SET',
    restChips: {
      red: 5,
      yellow: 5,
      blue: 5,
      black: 5,
    },
    firstPlayer: {
      order: 'FIRST',
      chips: { red: 0, yellow: 0, blue: 0, black: 0 },
    },
    secondPlayer: {
      order: 'SECOND',
      chips: { red: 0, yellow: 0, blue: 0, black: 0 },
    },
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
  });

  const finished = useMemo(
    () =>
      Object.values(gameData.restChips).every((chip) => chip === 0) &&
      gameData.phase === 'SET',
    [gameData]
  );

  return (
    <div>
      {!finished && (
        <>
          <PlayerBar order={gameData.turn} />
          <div className="px-4">
            <SetBoxes gameData={gameData} setGameData={setGameData} />
          </div>
        </>
      )}

      <Space h={16} />
      <Divider />
      <div className="px-4">
        <GameStatus gameData={gameData} />
      </div>

      <Space h={400} />
      <Divider />
      <Space h={40} />

      <pre>{JSON.stringify(gameData, null, 2)}</pre>
    </div>
  );
}

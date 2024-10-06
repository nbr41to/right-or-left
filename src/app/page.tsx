'use client';

import { CurrentPlayerBar } from '@/components/CurrentPlayerBar';
import { ScoreBoard } from '@/components/ScoreBoard';
import { SetBoxes } from '@/components/SetBoxes';
import { Divider } from '@mantine/core';
import { use, useMemo, useState } from 'react';

export default function Home() {
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
  });

  const currentPlayer: Player = useMemo(() => {
    return gameData.turn === 'FIRST'
      ? gameData.firstPlayer
      : gameData.secondPlayer;
  }, [gameData]);

  const finished = useMemo(
    () =>
      Object.values(gameData.restChips).every((chip) => chip === 0) &&
      gameData.phase === 'SET',
    [gameData]
  );

  return (
    <div className="px-2">
      {finished ? (
        <>
          <CurrentPlayerBar order={'FIRST'} />
          <ScoreBoard player={gameData.firstPlayer} />
          <CurrentPlayerBar order={'SECOND'} />
          <ScoreBoard player={gameData.secondPlayer} />
        </>
      ) : (
        <>
          <CurrentPlayerBar order={gameData.turn} />
          <ScoreBoard player={currentPlayer} />
          <SetBoxes
            restChips={gameData.restChips}
            gameData={gameData}
            setGameData={setGameData}
          />
        </>
      )}

      <Divider />

      <pre className="mt-80">{JSON.stringify(gameData, null, 2)}</pre>
    </div>
  );
}

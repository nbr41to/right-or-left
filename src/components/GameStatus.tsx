'use client';

import { calcTotalChipsBox } from '@/lib/game-utils';
import { PlayerBar } from './PlayerBar';
import { ScoreBoard } from './ScoreBoard';
import { ActionIcon, Space } from '@mantine/core';
import { FaExchangeAlt } from 'react-icons/fa';
import { useState } from 'react';

type Props = {
  gameData: GameData;
};

export const GameStatus = ({ gameData }: Props) => {
  const [estimateSwitch, setEstimateSwitch] = useState(false);

  return (
    <div>
      {gameData.phase === 'SET' && (
        <div className="flex justify-end py-4">
          <ActionIcon
            variant="transparent"
            color="red"
            onClick={() => setEstimateSwitch((prev) => !prev)}
          >
            <FaExchangeAlt size={32} />
          </ActionIcon>
        </div>
      )}

      <PlayerBar order={'FIRST'} />
      <ScoreBoard
        player={gameData.firstPlayer}
        toEstimate={
          gameData.phase === 'SET'
            ? calcTotalChipsBox(
                gameData.settingBoxes[estimateSwitch ? 'left' : 'right']
              )
            : undefined
        }
      />
      <Space h={16} />

      <PlayerBar order={'SECOND'} />
      <ScoreBoard
        player={gameData.secondPlayer}
        toEstimate={
          gameData.phase === 'SET'
            ? calcTotalChipsBox(
                gameData.settingBoxes[estimateSwitch ? 'right' : 'left']
              )
            : undefined
        }
      />
    </div>
  );
};

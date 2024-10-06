export const COLOR = {
  RED: 'red',
  YELLOW: 'yellow',
  BLUE: 'blue',
  BLACK: 'black',
} as const;
export const INITIAL_BOARD_BLOCKS: Chips = {
  red: 5,
  yellow: 5,
  blue: 5,
  black: 6,
};

/**
 * color   quantity: points
 * ------------------------------------------------
 * red     1: 2, 2: 4, 3: 6, 4: 0, 5: 0
 * yellow  1: 1, 2: 3, 3: 5, 4: 0, 5: 0
 * blue    1: 1, 2: 2, 3: 4, 4: 0, 5: 0
 * black   1: 0, 2: 1, 3: 1, 4: 7, 5: 0
 */
export const SCORE_CONSTANTS = {
  red: [0, 2, 4, 6, 0, 0],
  yellow: [0, 1, 3, 5, 0, 0],
  blue: [0, 1, 2, 4, 0, 0],
  black: [0, 0, 1, 1, 7, 0],
};

export const calcScore = (chips: Chips) => {
  const { red, yellow, blue, black } = chips;

  const redPoints = SCORE_CONSTANTS.red[red];
  const yellowPoints = SCORE_CONSTANTS.yellow[yellow];
  const bluePoints = SCORE_CONSTANTS.blue[blue];
  const blackPoints = SCORE_CONSTANTS.black[black];

  return redPoints + yellowPoints + bluePoints + blackPoints;
};

/* Boxの上と中のChipを集計する */
export const calcTotalChipsBox = (box: Box): Chips => ({
  red: box.on.red + box.in.red,
  yellow: box.on.yellow + box.in.yellow,
  blue: box.on.blue + box.in.blue,
  black: box.on.black + box.in.black,
});

/* 右左2つのBoxのChipを集計する */
export const calcTotalChipsBoxes = (settingBoxes: GameData['settingBoxes']) => {
  const chips = {
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0,
  };

  for (const box of Object.values(settingBoxes)) {
    for (const position of Object.values(box)) {
      for (const [color, quantity] of Object.entries(position)) {
        chips[color as Color] += quantity;
      }
    }
  }

  return {
    chips,
    total: Object.values(chips).reduce((acc, cur) => acc + cur, 0),
  };
};

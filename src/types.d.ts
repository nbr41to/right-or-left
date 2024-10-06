type Color = 'red' | 'yellow' | 'blue' | 'black';

type Chips = Record<Color, number>;

type Order = 'FIRST' | 'SECOND';

type Player = {
  order: Order;
  chips: Chips;
};

type Box = {
  on: Chips;
  in: Chips;
};

type GameData = {
  turn: Order;
  restChips: Chips;
  phase: 'SET' | 'SELECT';
  firstPlayer: Player;
  secondPlayer: Player;
  // selectBoxes: [Box, Box];
};

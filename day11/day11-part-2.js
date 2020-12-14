const { getInput } = require('../utils');

const DIRECTIONS = {
  UP_RIGHT: 'up-right',
  UP: 'up',
  UP_LEFT: 'up-left',
  LEFT: 'left',
  DOWN_LEFT: 'down-left',
  DOWN: 'down',
  DOWN_RIGHT: 'down-right',
  RIGHT: 'right'
};

const parseInput = (input) => {
  return input.split('\n').map((row) => row.split(''));
};

const processLayout = (seatLayout) => {
  let changedSeats = 0;
  let occupiedSeats = 0;
  const newLayout = [];

  for (let r = 0; r < seatLayout.length; r += 1) {
    newLayout[r] = [];

    for (let c = 0; c < seatLayout[0].length; c += 1) {
      const seat = seatLayout[r][c];
      const newSeat = processSeat(seatLayout, r, c);

      if (newSeat !== seat) {
        changedSeats += 1;
      }

      if (newSeat === '#') {
        occupiedSeats += 1;
      }

      newLayout[r][c] = newSeat;
    }
  }

  return { layout: newLayout, changedSeats, occupiedSeats };
};

const processSeat = (seatLayout, row, col) => {
  const seat = seatLayout[row][col];

  switch (seat) {
    case 'L':
      return processEmptySeat(seatLayout, row, col);
    case '#':
      return processOccupiedSeat(seatLayout, row, col);
    default:
      return seat;
  }
};

const processEmptySeat = (seatLayout, row, col) => {
  for (const direction of Object.values(DIRECTIONS)) {
    if (getFirstSeat(seatLayout, direction, row, col) === '#') {
      return 'L';
    }
  }

  return '#';
};

const getFirstSeat = (seatLayout, direction, row, col, isInitial = true) => {
  if (
    row < 0 ||
    row >= seatLayout.length ||
    col < 0 ||
    col >= seatLayout[0].length
  ) {
    return null;
  }

  const seat = seatLayout[row][col];

  if (!isInitial && seat !== '.') {
    return seat;
  }

  let nextRow = row;
  let nextCol = col;

  switch (direction) {
    case DIRECTIONS.UP_LEFT:
      nextRow += -1;
      nextCol += -1;
      break;
    case DIRECTIONS.UP:
      nextRow += -1;
      nextCol += 0;
      break;
    case DIRECTIONS.UP_RIGHT:
      nextRow += -1;
      nextCol += 1;
      break;
    case DIRECTIONS.RIGHT:
      nextRow += 0;
      nextCol += 1;
      break;
    case DIRECTIONS.DOWN_RIGHT:
      nextRow += 1;
      nextCol += 1;
      break;
    case DIRECTIONS.DOWN:
      nextRow += 1;
      nextCol += 0;
      break;
    case DIRECTIONS.DOWN_LEFT:
      nextRow += 1;
      nextCol += -1;
      break;
    // left
    default:
      nextRow += 0;
      nextCol += -1;
  }

  return getFirstSeat(seatLayout, direction, nextRow, nextCol, false);
};

const processOccupiedSeat = (seatLayout, row, col) => {
  let occupiedSeatsAround = 0;

  for (const direction of Object.values(DIRECTIONS)) {
    if (getFirstSeat(seatLayout, direction, row, col) === '#') {
      occupiedSeatsAround += 1;
    }

    if (occupiedSeatsAround >= 5) {
      return 'L';
    }
  }

  return '#';
};

const predictSeatOccupation = (seatLayout) => {
  let changedSeats = -1;
  let occupiedSeats = 0;
  let currentLayout = seatLayout;

  for (; changedSeats !== 0; ) {
    const roundResult = processLayout(currentLayout);
    currentLayout = roundResult.layout;
    ({ changedSeats, occupiedSeats } = roundResult);
  }

  return occupiedSeats;
};

const main = async (inputPath = 'day11/input') => {
  const seatLayout = await getInput(inputPath, parseInput);

  return predictSeatOccupation(seatLayout);
};

module.exports = { getFirstSeat, main };

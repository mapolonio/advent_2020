const { getInput } = require('../utils');

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
  for (let r = row - 1; r <= row + 1; r += 1) {
    if (r < 0 || r >= seatLayout.length) {
      continue;
    }

    for (let c = col - 1; c <= col + 1; c += 1) {
      if (c < 0 || c >= seatLayout[0].length) {
        continue;
      }

      if (r === row && c === col) {
        continue;
      }

      if (seatLayout[r][c] === '#') {
        return 'L';
      }
    }
  }

  return '#';
};

const processOccupiedSeat = (seatLayout, row, col) => {
  let occupiedSeatsAround = 0;

  for (let r = row - 1; r <= row + 1; r += 1) {
    if (r < 0 || r >= seatLayout.length) {
      continue;
    }

    for (let c = col - 1; c <= col + 1; c += 1) {
      if (c < 0 || c >= seatLayout[0].length) {
        continue;
      }

      if (r === row && c === col) {
        continue;
      }

      if (seatLayout[r][c] === '#') {
        occupiedSeatsAround += 1;
      }

      if (occupiedSeatsAround >= 4) {
        return 'L';
      }
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

module.exports = { main, parseInput, processLayout };

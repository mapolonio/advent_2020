const { getInput } = require('../utils');

const parseBoardingPasses = (input) => {
  return input.split('\n').map((boardingPass) => {
    const row = getRow(boardingPass);
    const column = getColumn(boardingPass);

    return getSeatId(row, column);
  });
};

const getRow = (boardingPass) => {
  let minRow = 0;
  let maxRow = 127;

  for (let i = 0; i < 7; i += 1) {
    const section = boardingPass.charAt(i);
    const half = Math.ceil((maxRow - minRow) / 2);

    switch (section) {
      case 'F':
        maxRow -= half;
        break;
      default:
        minRow += half;
    }
  }

  return maxRow;
};

const getColumn = (boardingPass) => {
  let minColumn = 0;
  let maxColumn = 7;

  for (let i = 7; i < 10; i += 1) {
    const section = boardingPass.charAt(i);
    const half = Math.ceil((maxColumn - minColumn) / 2);

    switch (section) {
      case 'L':
        maxColumn -= half;
        break;
      default:
        minColumn += half;
    }
  }

  return maxColumn;
};

const getSeatId = (row, column) => {
  // eslint-disable-next-line
  return row * 8 + column;
};

const main = async (inputPath = 'day5/input') => {
  const seatIds = await getInput(inputPath, parseBoardingPasses);
  let highestId;

  for (const seatId of seatIds) {
    if (highestId === undefined || highestId < seatId) {
      highestId = seatId;
    }
  }

  return highestId;
};

module.exports = {
  getColumn,
  getRow,
  getSeatId,
  main,
};

const { getInput } = require('../utils');

const parseBoardingPasses = (input) => input.split('\n');

const getSeatsData = ({ boardingPasses, totalRows, totalColumns }) => {
  const seatsMapping = {};
  // eslint-disable-next-line no-mixed-operators
  let lowestSeat = totalRows * totalColumns - 1;
  let highestSeat = 0;

  boardingPasses.forEach((boardingPass) => {
    const row = getRow(boardingPass);
    const column = getColumn(boardingPass);
    const seatNumber = getSeatNumber(row, column, totalColumns);

    if (seatNumber < lowestSeat) {
      lowestSeat = seatNumber;
    }

    if (seatNumber > highestSeat) {
      highestSeat = seatNumber;
    }

    seatsMapping[seatNumber] = { row, column };
  });

  return {
    lowestSeat,
    highestSeat,
    seatsMapping
  };
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
  // eslint-disable-next-line no-mixed-operators
  return row * 8 + column;
};

const getSeatNumber = (row, column, totalColumns) => {
  // eslint-disable-next-line no-mixed-operators
  return row * totalColumns + column;
};

const findEmptySeatId = ({
  lowestSeat,
  highestSeat,
  seatsMapping,
  totalColumns
}) => {
  for (let i = lowestSeat; i < highestSeat; i += 1) {
    const { row, column } = seatsMapping[i];

    if (!seatsMapping[i + 1]) {
      const nextSeat = getNextSeat({ row, column, totalColumns });

      return getSeatId(nextSeat.row, nextSeat.column);
    }
  }
};

const getNextSeat = ({ row, column, totalColumns }) => {
  let nextColumn = column + 1;
  let nextRow = row;

  if (nextColumn > totalColumns) {
    nextColumn = 0;
    nextRow = row + 1;
  }

  return {
    row: nextRow,
    column: nextColumn
  };
};

const main = async (inputPath = 'day5/input') => {
  const boardingPasses = await getInput(inputPath, parseBoardingPasses);
  const totalColumns = 8;
  const totalRows = 128;
  const seatsData = getSeatsData({
    boardingPasses,
    totalColumns,
    totalRows
  });

  return findEmptySeatId({ ...seatsData, totalColumns });
};

module.exports = {
  main
};

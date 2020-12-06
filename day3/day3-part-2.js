const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n').map((line) => line.split(''));
};

const slideDown = (grid, horizontalSteps, verticalSteps) => {
  let trees = 0;
  let currentX = 0;
  let currentY = 0;

  for (; currentY < grid.length; ) {
    if (isTree(grid, currentX, currentY)) {
      trees += 1;
    }

    currentX += horizontalSteps;
    currentY += verticalSteps;
  }

  return trees;
};

const isTree = (grid, posX, posY) => {
  const row = grid[posY];
  const crap = getObject(row, posX);

  return crap === '#';
};

const getObject = (row, posX) => {
  return row[posX % row.length];
};

const main = async () => {
  const grid = await getInput('day3/input', parseInput);
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];
  let treeMultiplication = 1;

  for (const slope of slopes) {
    const treeQty = slideDown(grid, slope.right, slope.down);
    treeMultiplication *= treeQty;
  }

  return treeMultiplication;
};

module.exports = { main };

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

  const treeQty = slideDown(grid, 3, 1);

  console.log(treeQty);
};

module.exports = { main };

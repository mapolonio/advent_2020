const { getInput } = require('../utils');

const parseInput = (input) => {
  const rows = input.split('\n').map((row) => row.split(''));
  const result = {};
  const level = 0;

  for (let row = 0; row < rows.length; row += 1) {
    for (let col = 0; col < rows[row].length; col += 1) {
      if (rows[row][col] === '#') {
        result[getKey(level, row, col)] = true;
      }
    }
  }

  return result;
};

const getKey = (level, row, col) => {
  return `${level},${row},${col}`;
};

const runSimulation = (initialMap, cycles) => {
  let currentMap = { ...initialMap };

  for (let i = 0; i < cycles; i += 1) {
    currentMap = simulateCycle(currentMap);
  }

  return currentMap;
};

const simulateCycle = (cubeMap) => {
  const cubesToCheck = getCubesToCheck(cubeMap);
  const result = { ...cubeMap };

  for (const cube of cubesToCheck) {
    const nextState = getNextState(cube, cubeMap);

    if (nextState) {
      result[cube] = nextState;
    } else {
      delete result[cube];
    }
  }

  return result;
};

const getCubesToCheck = (cubeMap) => {
  const result = new Set();

  for (const cube in cubeMap) {
    result.add(cube);
    const neighbors = getNeighbors(cube);

    for (const neighbor of neighbors) {
      result.add(neighbor);
    }
  }

  return result;
};

const getNeighbors = (cube) => {
  const result = [];
  const [level, row, col] = cube.split(',').map((value) => parseInt(value, 10));

  for (let l = level - 1; l <= level + 1; l += 1) {
    for (let r = row - 1; r <= row + 1; r += 1) {
      for (let c = col - 1; c <= col + 1; c += 1) {
        if (l === level && r === row && c === col) {
          continue;
        }

        result.push(getKey(l, r, c));
      }
    }
  }

  return result;
};

const getNextState = (cube, cubeMap) => {
  const currentState = cubeMap[cube];
  const neighbors = getNeighbors(cube);
  let activeNeighbors = 0;
  let nextSate;

  for (const neighbor of neighbors) {
    if (cubeMap[neighbor]) {
      activeNeighbors += 1;
    }
  }

  if (currentState) {
    nextSate = activeNeighbors === 2 || activeNeighbors === 3;
  } else {
    nextSate = activeNeighbors === 3;
  }

  return nextSate;
};

const main = async (inputPath = 'day17/input') => {
  const cubeMap = await getInput(inputPath, parseInput);
  const result = runSimulation(cubeMap, 6);

  return Object.keys(result).length;
};

module.exports = { main, parseInput, simulateCycle };

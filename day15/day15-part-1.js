const { getInput } = require('../utils');

const parseInput = (input) => {
  const [numbers] = input.split('\n');

  return numbers.split(',').map((n) => parseInt(n, 10));
};

const playGame = (initialNumbers, maxTurns) => {
  if (maxTurns <= initialNumbers.length) {
    return initialNumbers[maxTurns - 1];
  }

  const memory = initializeMemory(initialNumbers);
  let lastNumber = initialNumbers[initialNumbers.length - 1];

  for (let i = initialNumbers.length + 1; i <= maxTurns; i += 1) {
    const previousSpoke = memory[lastNumber];

    if (previousSpoke === undefined) {
      lastNumber = 0;
    } else {
      lastNumber = previousSpoke.last - previousSpoke.prev;
    }

    updateMemory(memory, lastNumber, i);
  }

  return lastNumber;
};

const initializeMemory = (initialNumbers) => {
  const memory = {};

  for (let i = 0; i < initialNumbers.length; i += 1) {
    const number = initialNumbers[i];

    memory[number] = { last: i + 1, prev: i + 1 };
  }

  return memory;
};

const updateMemory = (memory, lastNumber, turn) => {
  const data = memory[lastNumber];

  if (!data) {
    memory[lastNumber] = { last: turn, prev: turn };
    return;
  }

  memory[lastNumber].prev = memory[lastNumber].last;
  memory[lastNumber].last = turn;
};

const main = async (inputPath = 'day15/input') => {
  const initialNumbers = await getInput(inputPath, parseInput);
  const lastNumber = playGame(initialNumbers, 2020);

  return lastNumber;
};

module.exports = { initializeMemory, main, parseInput, playGame };

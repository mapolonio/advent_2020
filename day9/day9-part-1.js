const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n').map((n) => parseInt(n, 10));
};

const getFirstInvalid = (numbers, preambleSize) => {
  const preampleMap = initPreambleMap(numbers, preambleSize);

  for (let i = preambleSize; i < numbers.length; i += 1) {
    const target = numbers[i];

    if (!isValid(target, preampleMap)) {
      return target;
    }

    const oldestKey = `${numbers[i - preambleSize]}`;

    delete preampleMap[oldestKey];
    preampleMap[target] = true;
  }

  return null;
};

const initPreambleMap = (numbers, preambleSize) => {
  const result = {};

  for (let i = 0; i < preambleSize; i += 1) {
    result[numbers[i]] = true;
  }

  return result;
};

const isValid = (target, preampleMap) => {
  for (const key in preampleMap) {
    const number = parseInt(key, 10);
    const complement = target - number;

    if (`${complement}` in preampleMap) {
      return true;
    }
  }

  return false;
};

const main = async (inputPath = 'day9/input', preambleSize = 25) => {
  const numbers = await getInput(inputPath, parseInput);
  const result = getFirstInvalid(numbers, preambleSize);

  return result;
};

module.exports = { isValid, main };

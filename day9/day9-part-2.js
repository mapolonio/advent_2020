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

const getListThatSums = (numbers, target) => {
  for (let i = 0; i < numbers.length; i += 1) {
    let sum = numbers[i];

    for (let j = i + 1; sum <= target; j += 1) {
      sum += numbers[j];

      if (sum === target) {
        return numbers.slice(i, j + 1);
      }
    }
  }

  return null;
};

const sumMinMax = (numbers) => {
  let min;
  let max;

  for (const number of numbers) {
    if (min === undefined || number < min) {
      min = number;
    }

    if (max === undefined || max < number) {
      max = number;
    }
  }

  return min + max;
};

const main = async (inputPath = 'day9/input', preambleSize = 25) => {
  const numbers = await getInput(inputPath, parseInput);
  const result = getFirstInvalid(numbers, preambleSize);
  const listOfNumbers = getListThatSums(numbers, result);

  return sumMinMax(listOfNumbers);
};

module.exports = { getListThatSums, main, sumMinMax };

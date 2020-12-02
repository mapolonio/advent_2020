const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n').map((number) => parseInt(number, 10));
};

const getMapping = (numbers) => {
  const result = new Map();

  numbers.forEach((number) => {
    result.set(number, true);
  });

  return result;
};

const getEntriesForSum = (target, numbers) => {
  const result = [];
  const numberMapping = getMapping(numbers);

  for (const number of numbers) {
    const complement = target - number;

    if (numberMapping.has(complement)) {
      result.push(number, complement);
      break;
    }
  }

  return result;
};

const main = async (target = 2020) => {
  const numbers = await getInput('day1/input', parseInput);
  const entries = getEntriesForSum(target, numbers);

  const result = entries.reduce((acc, entry) => acc * entry, 1);

  console.log(result);
};

main();

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

const getEntriesForSum = (target, numbers, numberMapping, entriesQty) => {
  if (entriesQty === 1) {
    return numberMapping.has(target) ? [target] : undefined;
  }

  for (let index = 0; index < numbers.length; index += 1) {
    const number = numbers[index];
    const complement = target - number;
    const restOfEntries = getEntriesForSum(
      complement,
      numbers.slice(index + 1),
      numberMapping,
      entriesQty - 1
    );

    if (restOfEntries !== undefined) {
      return [...restOfEntries, number];
    }
  }

  return;
};

const main = async (target = 2020) => {
  const numbers = await getInput('day1/input', parseInput);
  const numberMapping = getMapping(numbers);
  const entries = getEntriesForSum(target, numbers, numberMapping, 3);

  const result = entries.reduce((acc, entry) => acc * entry, 1);

  console.log(result);
};

main();

const { getInput } = require('../utils');

const parseForms = (input) => {
  return input.split('\n\n').map((group) => {
    const answerSet = new Set();

    for (const form of group.split('\n')) {
      for (const answer of form) {
        answerSet.add(answer);
      }
    }

    return answerSet;
  });
};

const main = async (inputPath = 'day6/input') => {
  const answerSets = await getInput(inputPath, parseForms);
  const result = answerSets.reduce(
    (total, currentSet) => total + currentSet.size,
    0
  );

  return result;
};

module.exports = {
  main,
  parseForms
};

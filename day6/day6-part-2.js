const { getInput } = require('../utils');

const parseForms = (input) => input.split('\n\n');

const countSharedAnswersByGroup = (groups) => {
  return groups.map((group) => {
    const forms = group.split('\n');
    const answerCount = getAnswersCount(forms);

    return countSharedAnswers(answerCount, forms.length);
  });
};

const getAnswersCount = (forms) => {
  const answerCount = new Map();

  for (const form of forms) {
    for (const answer of form) {
      if (!answerCount.has(answer)) {
        answerCount.set(answer, 1);
      } else {
        answerCount.set(answer, answerCount.get(answer) + 1);
      }
    }
  }

  return answerCount;
};

const countSharedAnswers = (answerCount, numberOfParticipants) => {
  let total = 0;

  answerCount.forEach((count) => {
    if (count === numberOfParticipants) {
      total += 1;
    }
  });

  return total;
};

const main = async (inputPath = 'day6/input') => {
  const groups = await getInput(inputPath, parseForms);
  const sharedAnswerCounts = countSharedAnswersByGroup(groups);
  const result = sharedAnswerCounts.reduce((total, count) => total + count, 0);

  return result;
};

module.exports = {
  getAnswersCount,
  main,
  parseForms
};

const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n').reduce((result, textRule) => {
    const parsedRule = parseRule(textRule);

    for (const color in parsedRule) {
      result[color] = result[color] || {};

      result[color] = {
        ...result[color],
        ...parsedRule[color]
      };
    }

    return result;
  }, {});
};

const parseRule = (textRule) => {
  const [containerColor, contents] = textRule.split(' bags contain ');
  const contentTypes = contents.substring(0, contents.length - 1).split(', ');
  const result = {
    [containerColor]: {}
  };

  for (const contentType of contentTypes) {
    const bagContent = parseBagContent(contentType);

    if (bagContent === null) {
      continue;
    }

    result[containerColor][bagContent.color] = bagContent.quantity;
  }

  return result;
};

const parseBagContent = (bagContent) => {
  if (bagContent === 'no other bags') {
    return null;
  }

  const [bagKind] = bagContent.split(' bag');
  const pattern = /^(\d+) (.+)$/;
  const [, quantity, color] = bagKind.match(pattern);

  return { color, quantity: parseInt(quantity, 10) };
};

const countRequiredBags = (bagColor, bagMapping) => {
  const bagTypes = bagMapping[bagColor];

  let sum = 0;

  for (const color in bagTypes) {
    const quantity = bagTypes[color];

    // eslint-disable-next-line no-mixed-operators
    sum += quantity + quantity * countRequiredBags(color, bagMapping);
  }

  return sum;
};

const main = async (inputPath = 'day7/input') => {
  const bagMapping = await getInput(inputPath, parseInput);
  const requiredBags = countRequiredBags('shiny gold', bagMapping);

  return requiredBags;
};

module.exports = { countRequiredBags, main, parseBagContent, parseInput };

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

    result[bagContent.color] = result[bagContent.color] || {};

    result[bagContent.color][containerColor] = bagContent.quantity;
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

const getPossibleContainers = (bagColor, bagMapping, list = new Set()) => {
  const containers = bagMapping[bagColor];

  if (Object.keys(containers).length === 0) {
    return list;
  }

  for (const containerColor in containers) {
    list.add(containerColor);
    getPossibleContainers(containerColor, bagMapping, list);
  }

  return list;
};

const main = async (inputPath = 'day7/input') => {
  const bagMapping = await getInput(inputPath, parseInput);
  const possibleContainers = getPossibleContainers('shiny gold', bagMapping);

  return possibleContainers.size;
};

module.exports = { getPossibleContainers, main, parseBagContent, parseInput };

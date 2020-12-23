const { getInput } = require('../utils');

const parseInput = (input) => {
  const [rulesText, messagesText] = input.split('\n\n');

  return {
    rules: parseRules(rulesText),
    messages: messagesText.split('\n')
  };
};

const parseRules = (rulesText) => {
  return rulesText.split('\n').reduce((result, rule) => {
    const [id, content] = rule.split(': ');
    const charPattern = /"(.+)"/;
    const charMatch = content.match(charPattern);

    if (charMatch) {
      const [, char] = charMatch;

      return {
        ...result,
        [id]: {
          isChar: true,
          value: char
        }
      };
    }

    const ruleIds = [];
    const [ruleIdsText, alternativeRules] = content.split(' | ');

    ruleIds.push(ruleIdsText.split(' '));

    if (alternativeRules) {
      ruleIds.push(alternativeRules.split(' '));
    }

    return {
      ...result,
      [id]: {
        isChar: false,
        ruleIds
      }
    };
  }, {});
};

const reduceRule = (ruleId, rules, cache = {}) => {
  const cachedRule = cache[ruleId];

  if (cachedRule) {
    return cachedRule;
  }

  const rule = rules[ruleId];

  if (rule.isChar) {
    const result = [rule.value];
    cache[ruleId] = result;

    return result;
  }

  const { ruleIds } = rule;
  const result = [];

  for (const idSet of ruleIds) {
    const currentRules = [];

    for (const id of idSet) {
      let foundRules = cache[id];

      if (!foundRules) {
        foundRules = reduceRule(id, rules, cache);
      }

      currentRules.push(foundRules);
    }

    const joinedRules = mergeArrays(currentRules);

    for (const newRule of joinedRules) {
      result.push(newRule);
    }
  }

  cache[ruleId] = result;

  return result;
};

const mergeArrays = (arrays) => {
  let result = [...arrays[0]];

  for (let i = 1; i < arrays.length; i += 1) {
    const otherArray = arrays[i];
    const currentResult = [];

    for (const value of result) {
      for (const otherValue of otherArray) {
        currentResult.push(`${value}${otherValue}`);
      }
    }

    result = currentResult;
  }

  return result;
};

const getRuleTree = (rules) => {
  const idMap = {};
  let currentDependencies = getDependencies('0', rules);

  const stack = ['0'];

  for (; stack.length < Object.keys(rules).length; ) {
    const subDependencies = [];

    for (const dependency of currentDependencies) {
      if (!idMap[dependency]) {
        idMap[dependency] = true;
        stack.push(dependency);
      }

      for (const subdependency of getDependencies(dependency, rules)) {
        subDependencies.push(subdependency);
      }
    }

    currentDependencies = subDependencies;
  }

  return stack;
};

const getDependencies = (ruleId, rules) => {
  const result = [];
  const idMap = {};
  const rule = rules[ruleId];

  if (rule.isChar) {
    return result;
  }

  for (const idSet of rule.ruleIds) {
    for (const id of idSet) {
      if (!idMap[id]) {
        idMap[id] = true;
        result.push(id);
      }
    }
  }

  return result;
};

const main = async (inputPath = 'day19/input') => {
  const { rules, messages } = await getInput(inputPath, parseInput);
  const ruleStack = getRuleTree(rules);
  const ruleCache = {};

  for (let i = ruleStack.length - 1; i >= 0; i -= 1) {
    reduceRule(ruleStack[i], rules, ruleCache);
  }

  const reducedRules = ruleCache['0'];
  let validMessages = 0;

  for (const message of messages) {
    if (reducedRules.includes(message)) {
      validMessages += 1;
    }
  }

  return validMessages;
};

module.exports = { getRuleTree, main, mergeArrays, parseRules, reduceRule };

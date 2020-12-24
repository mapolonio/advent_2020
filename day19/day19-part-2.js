const { getInput } = require('../utils');

const parseInput = (input) => {
  const [rulesText, messagesText] = input.split('\n\n');
  const messages = messagesText.split('\n');

  return {
    rules: parseRules(rulesText),
    messages
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

const buildRegex = (ruleId, rules) => {
  const rule = rules[ruleId];

  if (rule.isChar) {
    return rule.value;
  }

  if (ruleId === '8') {
    return `${buildRegex('42', rules)}+`;
  }

  if (ruleId === '11') {
    return buildRule11(rules, 9);
  }

  const result = [];

  for (const idSet of rule.ruleIds) {
    const regexes = [];

    for (const id of idSet) {
      regexes.push(...buildRegex(id, rules));
    }

    result.push(regexes.join(''));
  }

  return `(${result.join('|')})`;
};

const buildRule11 = (rules, levels) => {
  const regexes = [];

  for (let i = 1; i <= levels; i += 1) {
    regexes.push(
      `${buildRegex('42', rules)}{${i}}${buildRegex('31', rules)}{${i}}`
    );
  }

  return `(${regexes.join('|')})`;
};

const addLoopRules = (rules) => {
  const loopRules = parseRules(
    ['8: 42 | 42 8', '11: 42 31 | 42 11 31'].join('\n')
  );

  rules['8'] = loopRules['8'];
  rules['11'] = loopRules['11'];
};

const main = async (inputPath = 'day19/input', overrideRules = true) => {
  const { rules, messages } = await getInput(inputPath, parseInput);
  const mainId = '0';

  if (overrideRules) {
    addLoopRules(rules);
  }

  const regex = new RegExp(`^${buildRegex(mainId, rules)}$`);
  let validMessages = 0;

  for (const message of messages) {
    if (regex.test(message)) {
      validMessages += 1;
    }
  }

  return validMessages;
};

module.exports = { buildRegex, main, parseRules };

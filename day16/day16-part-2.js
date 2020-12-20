const { getInput } = require('../utils');

const parseInput = (input) => {
  const [rulesText, personalTicketText, ticketsText] = input.split('\n\n');
  const personalTicket = parseTicket(personalTicketText.split('\n')[1]);
  const rules = rulesText.split('\n').map(parseRule);
  const validTickets = ticketsText
    .split('\n')
    .slice(1)
    .map(parseTicket)
    .filter((ticket) => isValidTicket(ticket, rules));

  return {
    rules,
    personalTicket,
    tickets: validTickets
  };
};

const parseRule = (ruleText) => {
  const [ruleName, ranges] = ruleText.split(': ');
  const [lowRange, highRange] = ranges.split(' or ');

  return {
    ruleName,
    lowRange: parseRange(lowRange),
    highRange: parseRange(highRange)
  };
};

const parseRange = (rangeText) => {
  const [min, max] = rangeText.split('-');

  return {
    min: parseInt(min, 10),
    max: parseInt(max, 10)
  };
};

const parseTicket = (ticketText) => {
  return ticketText.split(',').map((ticket) => parseInt(ticket, 10));
};

const isValidTicket = (ticket, rules) => {
  for (const value of ticket) {
    if (rules.every((rule) => !inRange(rule, value))) {
      return false;
    }
  }

  return true;
};

const inRange = (rule, value) => {
  const { lowRange, highRange } = rule;

  return (
    (lowRange.min <= value && value <= lowRange.max) ||
    (highRange.min <= value && value <= highRange.max)
  );
};

const getFieldsOrder = (rules, tickets) => {
  const ruleSets = [];

  for (let i = 0; i < tickets[0].length; i += 1) {
    ruleSets[i] = new Set([...rules]);
  }

  for (const ticket of tickets) {
    for (let i = 0; i < ticket.length; i += 1) {
      const value = ticket[i];
      const ruleSet = ruleSets[i];

      for (const rule of ruleSet) {
        if (!inRange(rule, value)) {
          ruleSet.delete(rule);
        }
      }
    }
  }

  return purgeDuplicateRules(ruleSets).map((set) => {
    const [{ ruleName }] = set;

    return ruleName;
  });
};

const purgeDuplicateRules = (ruleSets) => {
  if (ruleSets.every((ruleSet) => ruleSet.size === 1)) {
    return ruleSets;
  }

  for (const ruleSet of ruleSets) {
    if (ruleSet.size === 1) {
      continue;
    }

    for (const rule of ruleSet) {
      if (isRuleInAnotherPosition(rule, ruleSet, ruleSets)) {
        ruleSet.delete(rule);
      }
    }
  }

  return purgeDuplicateRules(ruleSets);
};

const isRuleInAnotherPosition = (rule, ruleSet, ruleSets) => {
  return ruleSets.find((set) => {
    if (set === ruleSet || set.size > 1) {
      return false;
    }

    const [candidateRule] = set;

    return candidateRule === rule;
  });
};

const main = async (inputPath = 'day16/input') => {
  const { personalTicket, rules, tickets } = await getInput(
    inputPath,
    parseInput
  );
  const fields = getFieldsOrder(rules, tickets);
  let result = 1;

  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];

    if (field.includes('departure')) {
      result *= personalTicket[i];
    }
  }

  return result;
};

module.exports = { getFieldsOrder, main, parseInput };

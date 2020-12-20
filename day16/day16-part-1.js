const { getInput } = require('../utils');

const parseInput = (input) => {
  const [rulesText, , ticketsText] = input.split('\n\n');

  return {
    rules: rulesText.split('\n').map(parseRule),
    tickets: ticketsText.split('\n').slice(1).map(parseTicket)
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

const getAllInvalidValues = (rules, tickets) => {
  const result = [];

  for (const ticket of tickets) {
    result.push(...validateTicket(ticket, rules));
  }

  return result;
};

const validateTicket = (ticket, rules) => {
  const invalidValues = [];

  for (const value of ticket) {
    if (rules.every((rule) => !inRange(rule, value))) {
      invalidValues.push(value);
    }
  }

  return invalidValues;
};

const inRange = (rule, value) => {
  const { lowRange, highRange } = rule;

  return (
    (lowRange.min <= value && value <= lowRange.max) ||
    (highRange.min <= value && value <= highRange.max)
  );
};

const main = async (inputPath = 'day16/input') => {
  const { rules, tickets } = await getInput(inputPath, parseInput);
  const invalidValues = getAllInvalidValues(rules, tickets);
  let result = 0;

  for (const value of invalidValues) {
    result += value;
  }

  return result;
};

module.exports = { main, parseInput, validateTicket };

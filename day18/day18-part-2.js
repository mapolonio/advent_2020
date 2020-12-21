const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n').map(solveExpression);
};

const solveExpression = (input) => {
  const expression = input.replace(/\s/g, '');

  if (/^\d+$/.test(expression)) {
    return parseInt(expression);
  }

  const parens = /\(([^()]+)\)/.exec(expression);

  if (parens) {
    const [found, subExpression] = parens;
    const { index } = parens;
    const lhs = expression.substring(0, index);
    const rhs = expression.substring(index + found.length);

    return solveExpression(`${lhs}${solveExpression(subExpression)}${rhs}`);
  }

  const numNum = parseExpression(expression, /^(\d+)([+|*])(\d+)$/);

  if (numNum) {
    const { lhs, rhs, operation } = numNum;
    return operation(solveExpression(lhs), solveExpression(rhs));
  }

  const sum = /(\d+\+\d+)/.exec(expression);

  if (sum) {
    const [found, subExpression] = sum;
    const { index } = sum;
    const lhs = expression.substring(0, index);
    const rhs = expression.substring(index + found.length);

    return solveExpression(`${lhs}${solveExpression(subExpression)}${rhs}`);
  }

  const numExpr = expression.match(/^(\d+[+|*]\d+)(.*)$/);

  if (numExpr) {
    const [, lhs, rhs] = numExpr;

    return solveExpression(`${solveExpression(lhs)}${rhs}`);
  }

  throw new Error(`Uncaptured expression: ${expression}`);
};

const parseExpression = (expression, pattern) => {
  const matchedExpression = expression.match(pattern);

  if (matchedExpression) {
    const [, lhs, operator, rhs] = matchedExpression;

    return {
      lhs,
      operation: getOperation(operator),
      rhs
    };
  }

  return matchedExpression;
};

const getOperation = (operator) => {
  switch (operator) {
    case '+':
      return (a, b) => a + b;
    default:
      return (a, b) => a * b;
  }
};

const main = async (inputPath = 'day18/input') => {
  const solutions = await getInput(inputPath, parseInput);
  let sum = 0;

  for (const solution of solutions) {
    sum += solution;
  }

  return sum;
};

module.exports = { main, solveExpression };

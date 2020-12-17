const { getInput } = require('../utils');

const parseInput = (input) => {
  const [, busList] = input.split('\n');

  return getEquations(busList);
};

const getEquations = (busList) => {
  return busList.split(',').reduce((result, bus, index) => {
    if (bus === 'x') {
      return result;
    }

    const modulo = parseInt(bus, 10);

    return [
      ...result,
      {
        remainder: getFirstPositiveReminder(0 - index, modulo),
        modulo
      }
    ];
  }, []);
};

const getFirstPositiveReminder = (remainder, modulo) => {
  for (let i = 0; ; i += 1) {
    // eslint-disable-next-line no-mixed-operators
    const candidate = i * modulo + remainder;

    if (candidate >= 0) {
      return candidate;
    }
  }
};

const solveEqualtions = (equations) => {
  const lcm = getLeastCommonMult(equations);
  const terms = equations.map((eq) => getFactors(eq, lcm));
  let result = 0;

  for (const term of terms) {
    result += term;
  }

  for (let min = result; min > 0; min -= lcm) {
    result = min;
  }

  return result;
};

const getLeastCommonMult = (equations) => {
  let result = 1;

  for (const eq of equations) {
    result *= eq.modulo;
  }

  return result;
};

const getFactors = (equation, lcm) => {
  const { modulo, remainder } = equation;
  const firstFactor = lcm / modulo;
  const simplifiedReminder = firstFactor % modulo;
  const secondFactor = findFactor(remainder, simplifiedReminder, modulo);

  return firstFactor * secondFactor;
};

const findFactor = (targetRemainder, currentRemainder, modulo) => {
  for (let i = 0; ; i += 1) {
    if ((currentRemainder * i) % modulo === targetRemainder) {
      return i;
    }
  }
};

const main = async (inputPath = 'day13/input') => {
  const equations = await getInput(inputPath, parseInput);
  const timestamp = solveEqualtions(equations);

  return timestamp;
};

module.exports = {
  solveEqualtions,
  getFactors,
  getLeastCommonMult,
  main,
  getEquations
};

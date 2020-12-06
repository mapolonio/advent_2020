const { getInput } = require('../utils');

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const parseInput = (input) => {
  return input
    .split('\n\n')
    .map((passport) => {
      return passport.split('\n');
    })
    .map(parsePassport);
};

const parsePassport = (lines) => {
  const result = {};

  for (const line of lines) {
    const data = line.split(' ');

    for (const datum of data) {
      const [field, value] = datum.split(':');

      result[field] = value;
    }
  }

  return result;
};

const isValidPassport = (passport) => {
  return REQUIRED_FIELDS.every((field) => passport[field] !== undefined);
};

const main = async () => {
  const passports = await getInput('day4/input', parseInput);

  const validPassports = passports.filter(isValidPassport);

  return validPassports.length;
};

module.exports = {
  main,
};

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
  return REQUIRED_FIELDS.every((field) => {
    const value = passport[field];

    if (value === undefined) {
      return false;
    }

    switch (field) {
      case 'byr':
        return isValidByr(value);
      case 'iyr':
        return isValidIyr(value);
      case 'eyr':
        return isValidEyr(value);
      case 'hgt':
        return isValidHgt(value);
      case 'hcl':
        return isValidHcl(value);
      case 'ecl':
        return isValidEcl(value);
      case 'pid':
        return isValidPid(value);
      default:
        return false;
    }
  });
};

const isValidByr = (byr) => {
  // four digits; at least 1920 and at most 2002

  return isValidYear(byr, 1920, 2002);
};

const isValidIyr = (iyr) => {
  // four digits; at least 2010 and at most 2020.

  return isValidYear(iyr, 2010, 2020);
};

const isValidEyr = (eyr) => {
  // four digits; at least 2020 and at most 2030.

  return isValidYear(eyr, 2020, 2030);
};

const isValidYear = (yearText, min, max) => {
  if (!/^\d{4}$/.test(yearText)) {
    return false;
  }

  const value = parseInt(yearText, 10);

  return value >= min && value <= max;
};

const isValidHgt = (hgt) => {
  /*
    a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
  */
  const pattern = /^(\d+)(cm|in)$/;

  if (!pattern.test(hgt)) {
    return false;
  }

  const [, numberText, unit] = hgt.match(pattern);
  const number = parseInt(numberText, 10);

  switch (unit) {
    case 'cm':
      return number >= 150 && number <= 193;
    case 'in':
      return number >= 59 && number <= 76;
    default:
      return false;
  }
};

const isValidHcl = (hcl) => {
  // a # followed by exactly six characters 0-9 or a-f.
  return /^#[0-9a-f]{6}$/.test(hcl);
};

const isValidEcl = (ecl) => {
  // exactly one of: amb blu brn gry grn hzl oth.
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl);
};

const isValidPid = (pid) => {
  // a nine-digit number, including leading zeroes.
  return /^\d{9}$/.test(pid);
};

const test1 = async () => {
  const validPassports = await getInput('day4/valid-passports', parseInput);
  const result = validPassports.filter(isValidPassport);

  if (result.length !== validPassports.length) {
    throw new Error('test 1 failed!');
  }

  console.log('Test 1: success');
};

const test2 = async () => {
  const invalidPassports = await getInput('day4/invalid-passports', parseInput);
  const result = invalidPassports.filter(isValidPassport);

  if (result.length !== 0) {
    throw new Error('test 2 failed!');
  }

  console.log('Test 2: success');
};

const test3 = () => {
  if (
    !isValidByr('2002') ||
    !!isValidByr('2003') ||
    !isValidHgt('60in') ||
    !isValidHgt('190cm') ||
    !!isValidHgt('190in') ||
    !!isValidHgt('190') ||
    !isValidHcl('#123abc') ||
    !!isValidHcl('#123abz') ||
    !!isValidHcl('123abc') ||
    !isValidEcl('brn') ||
    !!isValidEcl('wat') ||
    !isValidPid('000000001') ||
    !!isValidPid('0123456789')
  ) {
    throw new Error('test 3 failed');
  }

  console.log('Test 3: success');
};

const runTests = async () => {
  await test1();
  await test2();
  test3();
};

const main = async () => {
  const passports = await getInput('day4/input', parseInput);

  const validPassports = passports.filter(isValidPassport);

  console.log(validPassports.length);
};

main();
// runTests();

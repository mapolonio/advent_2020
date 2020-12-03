const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n');
};

const isValidPassword = (line) => {
  const { policy, password } = parseLine(line);

  return policy(password);
};

const parseLine = (line) => {
  const [policyText, password] = line.split(': ');

  return {
    policy: parsePolicy(policyText),
    password,
  };
};

const parsePolicy = (policyText) => {
  const [repetitions, letter] = policyText.split(' ');
  const [min, max] = repetitions.split('-');

  return (password) => {
    let count = 0;

    for (const char of password) {
      if (char === letter) {
        count += 1;
      }
    }

    return min <= count && count <= max;
  };
};

const main = async () => {
  const input = await getInput('day2/input', parseInput);
  const validPasswords = input.filter(isValidPassword);

  console.log(validPasswords.length);
};

main();

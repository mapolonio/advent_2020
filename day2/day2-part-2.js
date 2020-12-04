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
  const [positions, letter] = policyText.split(' ');
  const [pos1, pos2] = positions.split('-');

  return (password) => {
    const firstCheck = password.charAt(parseInt(pos1, 10) - 1) === letter;
    const secondCheck = password.charAt(parseInt(pos2, 10) - 1) === letter;

    return (firstCheck && !secondCheck) || (!firstCheck && secondCheck);
  };
};

const main = async () => {
  const input = await getInput('day2/input', parseInput);

  const validPasswords = input.filter(isValidPassword);

  console.log(validPasswords.length);
};

module.exports = { main };

const { getInput } = require('../utils');

const SUBJECT = 7;
const DIVISOR = 20201227;

const parseInput = (input) => {
  return input.split('\n').map((n) => parseInt(n, 10));
};

const transformSubject = (subject, prevValue = 1) => {
  return (prevValue * subject) % DIVISOR;
};

const getLoopSize = (publicKey) => {
  let current = 1;
  let loops = 0;

  while (current !== publicKey) {
    current = transformSubject(SUBJECT, current);
    loops += 1;
  }

  return loops;
};

const getEncryptionKey = (subject, loops) => {
  let current = 1;

  for (let i = 0; i < loops; i += 1) {
    current = transformSubject(subject, current);
  }

  return current;
};

const main = async (inputPath = 'day25/input') => {
  const publicKeys = await getInput(inputPath, parseInput);
  const loopSize = getLoopSize(publicKeys[0]);
  const encryptionKey = getEncryptionKey(publicKeys[1], loopSize);

  return encryptionKey;
};

module.exports = { getLoopSize, main };

const { getInput } = require('../utils');

const INSTRUCTIONS = {
  MEMSET: 'memSet',
  MASKSET: 'maskSet'
};

const parseInput = (input) => {
  return input.split('\n').map(parseInstruction);
};

const parseInstruction = (line) => {
  const [instructionTxt, value] = line.split(' = ');

  if (instructionTxt.startsWith('mem')) {
    return parseMemSet(instructionTxt, value);
  }

  return parseMask(value);
};

const parseMemSet = (instructionTxt, value) => {
  const pattern = /^mem\[(\d+)\]$/;
  const [, address] = instructionTxt.match(pattern);

  return {
    action: INSTRUCTIONS.MEMSET,
    address,
    value: parseInt(value)
  };
};

const parseMask = (value) => {
  return {
    action: INSTRUCTIONS.MASKSET,
    value
  };
};

const processProgram = (instructions) => {
  let currentMask;
  const memory = {};

  for (const instruction of instructions) {
    if (instruction.action === INSTRUCTIONS.MASKSET) {
      currentMask = instruction.value;
      continue;
    }

    memory[instruction.address] = applyMask(currentMask, instruction.value);
  }

  return memory;
};

const applyMask = (mask, value) => {
  const binary = toBinary(value);
  let result = '';

  for (let i = 0; i < mask.length; i += 1) {
    const bit = mask.charAt(i);

    if (bit === 'X') {
      result += binary.charAt(i);
      continue;
    }

    result += bit;
  }

  return toDecimal(result);
};

const toBinary = (number) => {
  let result = '';
  let currentValue = number;

  do {
    result = (currentValue % 2) + result;
    currentValue = Math.floor(currentValue / 2);
  } while (currentValue > 0);

  return result.padStart(36, '0');
};

const toDecimal = (binary) => {
  let result = 0;

  for (let i = 0; i < binary.length; i += 1) {
    const bit = binary.charAt(binary.length - 1 - i);

    if (bit === '1') {
      result += 2 ** i;
    }
  }

  return result;
};

const main = async (inputPath = 'day14/input') => {
  const instructions = await getInput(inputPath, parseInput);
  const memory = processProgram(instructions);

  let sum = 0;

  for (const value of Object.values(memory)) {
    sum += value;
  }

  return sum;
};

module.exports = {
  applyMask,
  main,
  parseInstruction,
  processProgram,
  toBinary,
  toDecimal
};

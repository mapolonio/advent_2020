const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n');
};

const processInstruction = (textInstruction, currentIndex, currentAcc) => {
  const [instruction, textValue] = textInstruction.split(' ');
  const value = parseInt(textValue, 10);
  let nextIndex = currentIndex;
  let acc = currentAcc;

  switch (instruction) {
    case 'acc':
      acc += value;
      nextIndex += 1;
      break;
    case 'jmp':
      nextIndex += value;
      break;
    default:
      nextIndex += 1;
      break;
  }

  return {
    nextIndex,
    acc
  };
};

const getAccBeforeLoop = (instructions) => {
  const processedInstructions = new Set();
  let currentIndex = 0;
  let result = 0;

  for (; !processedInstructions.has(currentIndex); ) {
    const instruction = instructions[currentIndex];
    const { acc, nextIndex } = processInstruction(
      instruction,
      currentIndex,
      result
    );
    processedInstructions.add(currentIndex);

    result = acc;
    currentIndex = nextIndex;
  }

  return result;
};

const main = async (inputPath = 'day8/input') => {
  const instructions = await getInput(inputPath, parseInput);
  const result = getAccBeforeLoop(instructions);

  return result;
};

module.exports = { main, processInstruction };

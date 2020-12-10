const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n');
};

const processInstruction = (instruction, value, currentIndex, currentAcc) => {
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

const parseInstruction = (textInstruction) => {
  const [instruction, textValue] = textInstruction.split(' ');
  const value = parseInt(textValue, 10);

  return {
    instruction,
    value
  };
};

const processProgram = ({
  instructions,
  index = 0,
  result = 0,
  stack = new Set(),
  canReplace = true
}) => {
  if (stack.has(index)) {
    return null;
  }

  if (index >= instructions.length) {
    return result;
  }

  const { instruction, value } = parseInstruction(instructions[index]);

  if (canReplace && ['nop', 'jmp'].includes(instruction)) {
    const {
      alternateInstructions,
      alternativeStack
    } = getAlternativeInstructions(instructions, index, stack);

    const newResult = processProgram({
      instructions: alternateInstructions,
      index,
      result,
      stack: alternativeStack,
      canReplace: false
    });

    if (newResult !== null) {
      return newResult;
    }
  }

  const { acc, nextIndex } = processInstruction(
    instruction,
    value,
    index,
    result
  );

  stack.add(index);

  return processProgram({
    instructions,
    index: nextIndex,
    result: acc,
    stack,
    canReplace
  });
};

const getAlternativeInstructions = (instructions, index, stack) => {
  const { instruction, value } = parseInstruction(instructions[index]);
  const sign = value >= 0 ? '+' : '';
  let replacedInstruction = instruction;

  switch (instruction) {
    case 'jmp':
      replacedInstruction = 'nop';
      break;
    case 'nop':
      replacedInstruction = 'jmp';
      break;
    default:
      break;
  }

  const newInstruction = `${replacedInstruction} ${sign}${value}`;

  return {
    alternateInstructions: [
      ...instructions.slice(0, index),
      newInstruction,
      ...instructions.slice(index + 1)
    ],
    alternativeStack: new Set(stack)
  };
};

const main = async (inputPath = 'day8/input') => {
  const instructions = await getInput(inputPath, parseInput);
  const result = processProgram({ instructions });

  return result;
};

module.exports = { getAlternativeInstructions, main, processInstruction };

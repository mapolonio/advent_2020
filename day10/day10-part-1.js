const { getInput } = require('../utils');

const parseInput = (input) => {
  const result = new Map();

  input.split('\n').forEach((adapter) => {
    const value = parseInt(adapter, 10);

    if (!result.has('max') || value > result.get('max')) {
      result.set('max', value);
    }
    result.set(value, true);
  });

  return result;
};

const getMatchingAdapters = (adapter, adapterMapping) => {
  const result = [];

  for (let i = 1; i < 4; i += 1) {
    const candidate = adapter + i;

    if (adapterMapping.has(candidate)) {
      result.push(candidate);
    }
  }

  return result;
};

// I realized this is just an over-complicated sort
const getAdapterConfiguration = (
  adapterMapping,
  configuration = [],
  jumps = {}
) => {
  const target = adapterMapping.get('max');
  const lastAdapter = configuration[configuration.length - 1] || 0;

  if (target === lastAdapter) {
    return { configuration, jumps: increaseJumps(jumps, 3) };
  }

  const candidates = getMatchingAdapters(lastAdapter, adapterMapping);

  for (const candidate of candidates) {
    const possibleResult = getAdapterConfiguration(
      adapterMapping,
      [...configuration, candidate],
      increaseJumps(jumps, candidate - lastAdapter)
    );

    if (possibleResult !== null) {
      const {
        configuration: possibleConfiguration,
        jumps: possibleJumps
      } = possibleResult;
      return { configuration: possibleConfiguration, jumps: possibleJumps };
    }
  }

  return null;
};

const increaseJumps = (jumps, jumpSize) => {
  const key = `${jumpSize}`;
  const result = {
    ...jumps
  };

  if (!(key in result)) {
    result[key] = 0;
  }

  result[key] += 1;

  return result;
};

const main = async (inputPath = 'day10/input') => {
  const adapterMapping = await getInput(inputPath, parseInput);
  const { jumps } = getAdapterConfiguration(adapterMapping);

  return jumps['1'] * jumps['3'];
};

module.exports = {
  getAdapterConfiguration,
  getMatchingAdapters,
  main,
  parseInput
};

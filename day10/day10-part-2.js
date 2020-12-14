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

const getAdapterConfiguration = (
  adapterMapping,
  lastAdapter = 0,
  validConfigs = 0,
  cache = new Map()
) => {
  const target = adapterMapping.get('max');

  if (target === lastAdapter) {
    return validConfigs + 1;
  }

  if (cache.has(lastAdapter)) {
    return cache.get(lastAdapter);
  }

  const candidates = getMatchingAdapters(lastAdapter, adapterMapping);
  let newValidConfigs = 0;

  if (candidates.length === 0) {
    return null;
  }

  for (const candidate of candidates) {
    const possibleResult = getAdapterConfiguration(
      adapterMapping,
      candidate,
      validConfigs,
      cache
    );

    if (possibleResult !== null) {
      newValidConfigs += possibleResult;
    }
  }

  const result = validConfigs + newValidConfigs;

  cache.set(lastAdapter, result);

  return result;
};

const main = async (inputPath = 'day10/input') => {
  const adapterMapping = await getInput(inputPath, parseInput);
  const numberOfConfigurations = getAdapterConfiguration(adapterMapping);

  return numberOfConfigurations;
};

module.exports = {
  getAdapterConfiguration,
  getMatchingAdapters,
  main,
  parseInput
};

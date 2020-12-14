const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const {
  getAdapterConfiguration,
  getMatchingAdapters,
  parseInput
} = require('./day10-part-1');

describe('Day 10 - Part 1', () => {
  describe('parseInput', () => {
    it('returns a hash map with the adapters', async () => {
      const result = await getInput('day10/test-input', parseInput);

      expect(result).to.deep.equal(
        new Map([
          [16, true],
          [10, true],
          [15, true],
          [5, true],
          [1, true],
          [11, true],
          [7, true],
          [19, true],
          [6, true],
          [12, true],
          [4, true],
          ['max', 19]
        ])
      );
    });
  });

  describe('getMatchingAdapters', () => {
    it('returns a list of compatible adapters for the given input', async () => {
      const adapterMapping = new Map([
        [16, true],
        [10, true],
        [15, true],
        [5, true],
        [1, true],
        [11, true],
        [7, true],
        [19, true],
        [6, true],
        [12, true],
        [4, true]
      ]);

      expect(getMatchingAdapters(0, adapterMapping)).to.have.deep.members([1]);
      expect(getMatchingAdapters(1, adapterMapping)).to.have.deep.members([4]);
      expect(getMatchingAdapters(4, adapterMapping)).to.have.deep.members([
        5,
        6,
        7
      ]);
      expect(getMatchingAdapters(5, adapterMapping)).to.have.deep.members([
        6,
        7
      ]);
      expect(getMatchingAdapters(7, adapterMapping)).to.have.deep.members([10]);
      expect(getMatchingAdapters(10, adapterMapping)).to.have.deep.members([
        11,
        12
      ]);
      expect(getMatchingAdapters(12, adapterMapping)).to.have.deep.members([
        15
      ]);
      expect(getMatchingAdapters(15, adapterMapping)).to.have.deep.members([
        16
      ]);
      expect(getMatchingAdapters(16, adapterMapping)).to.have.deep.members([
        19
      ]);
      expect(getMatchingAdapters(19, adapterMapping)).to.have.deep.members([]);
    });
  });

  describe('getAdapterConfiguration', () => {
    it('returns a list with the order of adapters required to get to target jolts', async () => {
      const adapterMapping = new Map([
        [16, true],
        [10, true],
        [15, true],
        [5, true],
        [1, true],
        [11, true],
        [7, true],
        [19, true],
        [6, true],
        [12, true],
        [4, true],
        ['max', 19]
      ]);

      const result = getAdapterConfiguration(adapterMapping);

      expect(result.configuration).to.deep.equal([
        1,
        4,
        5,
        6,
        7,
        10,
        11,
        12,
        15,
        16,
        19
      ]);
      expect(result.jumps).to.deep.equal({ 1: 7, 3: 5 });
    });
  });
});

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { getClosestMultiple, main, parseInput } = require('./day13-part-1');

describe('Day 13 - Part 1', () => {
  describe('parseInput', () => {
    it('parses departure time and bus list', async () => {
      const result = await getInput('day13/test-input', parseInput);

      expect(result).to.deep.equal({
        departureTime: 939,
        buses: [7, 13, 59, 31, 19]
      });
    });
  });

  describe('getClosestMultiple', () => {
    it('returns the closes multiplier that is equal or above target', async () => {
      expect(getClosestMultiple(939, 939)).to.equal(939);
      expect(getClosestMultiple(939, 7)).to.equal(945);
    });
  });

  describe('main', () => {
    it('returns the multiplication of the resulting bus ID and the waiting time', async () => {
      const result = await main('day13/test-input');

      expect(result).to.equal(295);
    });
  });
});

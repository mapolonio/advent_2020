const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getListThatSums, main, sumMinMax } = require('./day9-part-2');

describe('Day 9 - Part 2', () => {
  describe('getListThatSums', () => {
    it('returns a list of at least two contiguous numbers that sum a target value', async () => {
      const numbers = [
        127,
        35,
        20,
        15,
        25,
        47,
        40,
        62,
        55,
        65,
        95,
        102,
        117,
        150,
        182,
        219,
        299,
        277,
        309,
        576
      ];

      const result = getListThatSums(numbers, 127);

      expect(result).to.deep.equal([15, 25, 47, 40]);
    });
  });

  describe('sumMinMax', () => {
    it('returns the sum of the minimum and maximum numbers in a list', async () => {
      expect(sumMinMax([15, 25, 47, 40])).to.equal(62);
    });
  });

  describe('main', () => {
    it('returns the encryption weakness', async () => {
      const result = await main('day9/test-input', 5);

      expect(result).to.equal(62);
    });
  });
});

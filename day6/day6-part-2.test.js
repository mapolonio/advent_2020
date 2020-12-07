const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getAnswersCount, main } = require('./day6-part-2');

describe('Day 6 - Part 1', () => {
  describe('main', () => {
    it('returns the sum of answers pre group where everyone said "yes"', async () => {
      const result = await main('day6/test-input');

      expect(result).to.equal(6);
    });
  });

  describe('getAnswersCount', () => {
    it('returns a hashmap containing the number of repetitions of each answer', async () => {
      expect(getAnswersCount(['abc'])).to.deep.equal(
        new Map([
          ['a', 1],
          ['b', 1],
          ['c', 1]
        ])
      );
      expect(getAnswersCount(['a', 'b', 'c'])).to.deep.equal(
        new Map([
          ['a', 1],
          ['b', 1],
          ['c', 1]
        ])
      );
      expect(getAnswersCount(['ab', 'ac'])).to.deep.equal(
        new Map([
          ['a', 2],
          ['b', 1],
          ['c', 1]
        ])
      );
      expect(getAnswersCount(['a', 'a', 'a', 'a'])).to.deep.equal(
        new Map([['a', 4]])
      );
      expect(getAnswersCount(['b'])).to.deep.equal(new Map([['b', 1]]));
    });
  });
});

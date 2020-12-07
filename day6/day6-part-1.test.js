const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { main, parseForms } = require('./day6-part-1');

describe('Day 6 - Part 1', () => {
  describe('main', () => {
    it('returns the sum of positive answers from all forms', async () => {
      const result = await main('day6/test-input');

      expect(result).to.equal(11);
    });
  });

  describe('parseForms', () => {
    it('returns an array of sets with the answers', async () => {
      const result = await getInput('day6/test-input', parseForms);

      expect(result.length).to.equal(5);
      expect(result).to.deep.equal([
        new Set(['a', 'b', 'c']),
        new Set(['a', 'b', 'c']),
        new Set(['a', 'b', 'c']),
        new Set(['a']),
        new Set(['b'])
      ]);
    });
  });
});

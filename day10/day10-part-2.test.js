const { describe, it } = require('mocha');
const { expect } = require('chai');
const { main } = require('./day10-part-2');

describe('Day 10 - Part 2', () => {
  describe('main', () => {
    it('returns the number of possibe valid configurations of adapters', async () => {
      const result = await main('day10/test-input');
      const resultB = await main('day10/test-input-2');

      expect(result).to.equal(8);
      expect(resultB).to.equal(19208);
    });
  });
});

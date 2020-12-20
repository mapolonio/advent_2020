const { describe, it } = require('mocha');
const { expect } = require('chai');
const { main } = require('./day17-part-2');

describe('Day 17 - Part 2', () => {
  describe('main', () => {
    it('returns the number of active cubes after six cycles', async () => {
      const result = await main('day17/test-input');

      expect(result).to.equal(848);
    });
  });
});

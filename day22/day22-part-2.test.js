const { describe, it } = require('mocha');
const { expect } = require('chai');
const { main } = require('./day22-part-2');

describe('Day 22 - Part 2', () => {
  describe('main', () => {
    it('returns the score of the winning player', async () => {
      const result = await main('day22/test-input');

      expect(result).to.equal(291);
    });
  });
});

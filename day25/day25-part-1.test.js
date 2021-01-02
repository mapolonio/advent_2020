const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getLoopSize, main } = require('./day25-part-1');

describe('Day 25 - Part 1', () => {
  describe('getLoopSize', () => {
    it('returns the number of loops required to generate the provided public key', () => {
      expect(getLoopSize(5764801)).to.equal(8);
      expect(getLoopSize(17807724)).to.equal(11);
    });
  });

  describe('main', () => {
    it('returns the encryption key', async () => {
      const result = await main('day25/test-input');

      expect(result).to.equal(14897079);
    });
  });
});

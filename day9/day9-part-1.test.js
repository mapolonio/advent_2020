const { describe, it } = require('mocha');
const { expect } = require('chai');
const { isValid, main } = require('./day9-part-1');

describe('Day 9 - Part 1', () => {
  describe('isValid', () => {
    describe('when there are two different numbers that sum the target value', () => {
      it('returns true', () => {
        const preambleMap = {
          35: true,
          20: true,
          15: true,
          25: true,
          47: true
        };
        expect(isValid(40, preambleMap)).to.equal(true);
      });
    });

    describe('when there are not two different numbers that sum the target value', () => {
      it('returns false', async () => {
        const preambleMap = {
          95: true,
          102: true,
          117: true,
          150: true,
          182: true,
          127: true
        };
        expect(isValid(127, preambleMap)).to.equal(false);
      });
    });
  });

  describe('main', () => {
    it('returns the first invalid number from the list', async () => {
      const result = await main('day9/test-input', 5);

      expect(result).to.equal(127);
    });
  });
});

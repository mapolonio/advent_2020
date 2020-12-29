const { describe, it } = require('mocha');
const { expect } = require('chai');
const { main } = require('./day21-part-2');

describe('Day 21 - Part 2', () => {
  describe('main', () => {
    it('returns the list of ingredients that contain allergens ordered alphabetically by allergen', async () => {
      const result = await main('day21/test-input');

      expect(result).to.equal('mxmxvkd,sqjhc,fvjkl');
    });
  });
});

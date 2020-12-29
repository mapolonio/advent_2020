const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { main, parseInput } = require('./day21-part-1');

describe('Day 21 - Part 1', () => {
  describe('parseInput', () => {
    it('returns an array of objects with ingredients and allergens', async () => {
      const result = await getInput('day21/test-input', parseInput);

      expect(result).to.deep.equal([
        {
          ingredients: ['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'],
          allergens: ['dairy', 'fish']
        },
        {
          ingredients: ['trh', 'fvjkl', 'sbzzf', 'mxmxvkd'],
          allergens: ['dairy']
        },
        {
          ingredients: ['sqjhc', 'fvjkl'],
          allergens: ['soy']
        },
        {
          ingredients: ['sqjhc', 'mxmxvkd', 'sbzzf'],
          allergens: ['fish']
        }
      ]);
    });
  });

  describe('main', () => {
    it('returns the number of times the safe ingredients appear on the food list', async () => {
      const result = await main('day21/test-input');

      expect(result).to.equal(5);
    });
  });
});

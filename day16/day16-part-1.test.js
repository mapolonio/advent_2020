const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { main, parseInput, validateTicket } = require('./day16-part-1');

describe('Day 16 - Part 1', () => {
  describe('parseInput', () => {
    it('parses the rules and nearby tickets', async () => {
      const result = await getInput('day16/test-input', parseInput);

      expect(result).to.deep.equal({
        rules: [
          {
            ruleName: 'class',
            lowRange: { min: 1, max: 3 },
            highRange: { min: 5, max: 7 }
          },
          {
            ruleName: 'row',
            lowRange: { min: 6, max: 11 },
            highRange: { min: 33, max: 44 }
          },
          {
            ruleName: 'seat',
            lowRange: { min: 13, max: 40 },
            highRange: { min: 45, max: 50 }
          }
        ],
        tickets: [
          [7, 3, 47],
          [40, 4, 50],
          [55, 2, 20],
          [38, 6, 12]
        ]
      });
    });
  });

  describe('validateTicket', () => {
    it('returns invalid values after applyin a set of rules', async () => {
      const rules = [
        {
          ruleName: 'class',
          lowRange: { min: 1, max: 3 },
          highRange: { min: 5, max: 7 }
        },
        {
          ruleName: 'row',
          lowRange: { min: 6, max: 11 },
          highRange: { min: 33, max: 44 }
        },
        {
          ruleName: 'seat',
          lowRange: { min: 13, max: 40 },
          highRange: { min: 45, max: 50 }
        }
      ];

      expect(validateTicket([7, 3, 47], rules)).to.deep.equal([]);
      expect(validateTicket([40, 4, 50], rules)).to.deep.equal([4]);
      expect(validateTicket([55, 2, 20], rules)).to.deep.equal([55]);
      expect(validateTicket([38, 6, 12], rules)).to.deep.equal([12]);
    });
  });

  describe('main', () => {
    it('returns the sum of the invalid values of the nearby tickets', async () => {
      const result = await main('day16/test-input');

      expect(result).to.equal(71);
    });
  });
});

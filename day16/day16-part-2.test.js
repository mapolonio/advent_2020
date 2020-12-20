const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { getFieldsOrder, parseInput } = require('./day16-part-2');

describe('Day 16 - Part 2', () => {
  describe('parseInput', () => {
    it('parses the personal ticket, rules and valid nearby tickets', async () => {
      const result = await getInput('day16/test-input', parseInput);

      expect(result).to.deep.equal({
        personalTicket: [7, 1, 14],
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
        tickets: [[7, 3, 47]]
      });
    });
  });

  describe('getFieldsOrder', () => {
    it('returns an array with the ordered rules for each ticket field', async () => {
      const { rules, tickets } = await getInput(
        'day16/test-input-2',
        parseInput
      );

      const result = getFieldsOrder(rules, tickets);

      expect(result).to.deep.equal(['row', 'class', 'seat']);
    });
  });
});

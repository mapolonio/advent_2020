const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const {
  countRequiredBags,
  main,
  parseBagContent,
  parseInput
} = require('./day7-part-2');

describe('Day 7- Part 2', () => {
  describe('parseBagContent', () => {
    it('parses quantity and color of contents', async () => {
      expect(parseBagContent('1 bright white bag')).to.deep.equal({
        color: 'bright white',
        quantity: 1
      });
      expect(parseBagContent('2 muted yellow bags')).to.deep.equal({
        color: 'muted yellow',
        quantity: 2
      });
      expect(parseBagContent('no other bags')).to.deep.be.null;
    });
  });

  describe('parseInput', () => {
    it('returns parsed rules', async () => {
      const rulesA = await getInput('day7/test-input', parseInput);
      const rulesB = await getInput('day7/test-input-2', parseInput);

      expect(rulesA).to.deep.equal({
        'light red': { 'bright white': 1, 'muted yellow': 2 },
        'dark orange': { 'bright white': 3, 'muted yellow': 4 },
        'bright white': { 'shiny gold': 1 },
        'muted yellow': { 'shiny gold': 2, 'faded blue': 9 },
        'shiny gold': { 'dark olive': 1, 'vibrant plum': 2 },
        'dark olive': { 'faded blue': 3, 'dotted black': 4 },
        'vibrant plum': { 'faded blue': 5, 'dotted black': 6 },
        'faded blue': {},
        'dotted black': {}
      });
      expect(rulesB).to.deep.equal({
        'shiny gold': { 'dark red': 2 },
        'dark red': { 'dark orange': 2 },
        'dark orange': { 'dark yellow': 2 },
        'dark yellow': { 'dark green': 2 },
        'dark green': { 'dark blue': 2 },
        'dark blue': { 'dark violet': 2 },
        'dark violet': {}
      });
    });
  });

  describe('countRequiredBags', () => {
    it('returns the amount of bags required to be contained by the provided color', async () => {
      const bagMapping = {
        'light red': { 'bright white': 1, 'muted yellow': 2 },
        'dark orange': { 'bright white': 3, 'muted yellow': 4 },
        'bright white': { 'shiny gold': 1 },
        'muted yellow': { 'shiny gold': 2, 'faded blue': 9 },
        'shiny gold': { 'dark olive': 1, 'vibrant plum': 2 },
        'dark olive': { 'faded blue': 3, 'dotted black': 4 },
        'vibrant plum': { 'faded blue': 5, 'dotted black': 6 },
        'faded blue': {},
        'dotted black': {}
      };

      expect(countRequiredBags('faded blue', bagMapping)).to.equal(0);
      expect(countRequiredBags('dotted black', bagMapping)).to.equal(0);
      expect(countRequiredBags('dark olive', bagMapping)).to.equal(7);
      expect(countRequiredBags('vibrant plum', bagMapping)).to.equal(11);
      expect(countRequiredBags('shiny gold', bagMapping)).to.equal(32);
      expect(countRequiredBags('bright white', bagMapping)).to.equal(33);
      expect(countRequiredBags('muted yellow', bagMapping)).to.equal(75);
      expect(countRequiredBags('light red', bagMapping)).to.equal(186);
      expect(countRequiredBags('dark orange', bagMapping)).to.equal(406);
    });
  });

  describe('main', () => {
    it('returns the number required bags to be contained in a shiny gold bag', async () => {
      const resultA = await main('day7/test-input');
      const resultB = await main('day7/test-input-2');

      expect(resultA).to.equal(32);
      expect(resultB).to.equal(126);
    });
  });
});

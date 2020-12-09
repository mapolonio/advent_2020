const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const {
  getPossibleContainers,
  main,
  parseBagContent,
  parseInput
} = require('./day7-part-1');

describe('Day 7- Part 1', () => {
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
      const rules = await getInput('day7/test-input', parseInput);

      expect(rules).to.deep.equal({
        'bright white': {
          'light red': 1,
          'dark orange': 3
        },
        'muted yellow': {
          'light red': 2,
          'dark orange': 4
        },
        'shiny gold': {
          'bright white': 1,
          'muted yellow': 2
        },
        'faded blue': {
          'muted yellow': 9,
          'dark olive': 3,
          'vibrant plum': 5
        },
        'dark olive': {
          'shiny gold': 1
        },
        'vibrant plum': {
          'shiny gold': 2
        },
        'dotted black': {
          'dark olive': 4,
          'vibrant plum': 6
        },
        'light red': {},
        'dark orange': {}
      });
    });
  });

  describe('getPossibleContainers', () => {
    it('returns the amount of colors that can eventually contain another color', async () => {
      const bagMapping = {
        'bright white': {
          'light red': 1,
          'dark orange': 3
        },
        'muted yellow': {
          'light red': 2,
          'dark orange': 4
        },
        'shiny gold': {
          'bright white': 1,
          'muted yellow': 2
        },
        'faded blue': {
          'muted yellow': 9,
          'dark olive': 3,
          'vibrant plum': 5
        },
        'dark olive': {
          'shiny gold': 1
        },
        'vibrant plum': {
          'shiny gold': 2
        },
        'dotted black': {
          'dark olive': 4,
          'vibrant plum': 6
        },
        'light red': {},
        'dark orange': {}
      };

      expect(getPossibleContainers('bright white', bagMapping)).to.deep.equal(
        new Set(['light red', 'dark orange'])
      );
      expect(getPossibleContainers('dark olive', bagMapping)).to.deep.equal(
        new Set([
          'shiny gold',
          'bright white',
          'light red',
          'muted yellow',
          'dark orange'
        ])
      );
      expect(getPossibleContainers('vibrant plum', bagMapping)).to.deep.equal(
        new Set([
          'shiny gold',
          'bright white',
          'light red',
          'muted yellow',
          'dark orange'
        ])
      );
      expect(getPossibleContainers('shiny gold', bagMapping)).to.deep.equal(
        new Set(['bright white', 'light red', 'muted yellow', 'dark orange'])
      );
      expect(getPossibleContainers('muted yellow', bagMapping)).to.deep.equal(
        new Set(['light red', 'dark orange'])
      );
      expect(getPossibleContainers('faded blue', bagMapping)).to.deep.equal(
        new Set([
          'light red',
          'dark orange',
          'muted yellow',
          'shiny gold',
          'bright white',
          'vibrant plum',
          'dark olive'
        ])
      );
      expect(getPossibleContainers('dotted black', bagMapping)).to.deep.equal(
        new Set([
          'shiny gold',
          'bright white',
          'light red',
          'muted yellow',
          'dark orange',
          'dark olive',
          'vibrant plum'
        ])
      );
      expect(getPossibleContainers('light red', bagMapping)).to.deep.equal(
        new Set([])
      );
      expect(getPossibleContainers('dark orange', bagMapping)).to.deep.equal(
        new Set([])
      );
    });
  });

  describe('main', () => {
    it('returns the number of colors that can hold one shiny gold bag', async () => {
      const result = await main('day7/test-input');

      expect(result).to.equal(4);
    });
  });
});

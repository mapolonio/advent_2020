const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const {
  advanceOneDay,
  countBlackTiles,
  getTileMap,
  main,
  parseInput
} = require('./day24-part-2');

describe('Day 24 - Part 2', () => {
  describe('advanceOneDay', () => {
    it('returns a new tile map with the state after one day', async () => {
      const tileDirections = await getInput('day24/test-input', parseInput);
      const day0 = getTileMap(tileDirections);

      const day1 = advanceOneDay(day0);
      const day2 = advanceOneDay(day1);
      const day3 = advanceOneDay(day2);
      const day4 = advanceOneDay(day3);
      const day5 = advanceOneDay(day4);
      const day6 = advanceOneDay(day5);
      const day7 = advanceOneDay(day6);
      const day8 = advanceOneDay(day7);
      const day9 = advanceOneDay(day8);
      const day10 = advanceOneDay(day9);

      expect(countBlackTiles(day0)).to.equal(10);
      expect(countBlackTiles(day1)).to.equal(15);
      expect(countBlackTiles(day2)).to.equal(12);
      expect(countBlackTiles(day3)).to.equal(25);
      expect(countBlackTiles(day4)).to.equal(14);
      expect(countBlackTiles(day5)).to.equal(23);
      expect(countBlackTiles(day6)).to.equal(28);
      expect(countBlackTiles(day7)).to.equal(41);
      expect(countBlackTiles(day8)).to.equal(37);
      expect(countBlackTiles(day9)).to.equal(49);
      expect(countBlackTiles(day10)).to.equal(37);
    });
  });

  describe('main', () => {
    it('returns the total number of black tiles after 100 days', async () => {
      const result = await main('day24/test-input');

      expect(result).to.equal(2208);
    });
  });
});

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getColumn, getRow, getSeatId, main } = require('./day5-part-1');

describe('Day 5 - Part 1', () => {
  describe('getColumn', () => {
    it('parses columns', async () => {
      expect(getColumn('FFFBBBFRRR')).to.equal(7);
      expect(getColumn('BFFFBBFRRR')).to.equal(7);
      expect(getColumn('BBFFBBFRLL')).to.equal(4);
    });
  });

  describe('getRow', () => {
    it('parses rows', async () => {
      expect(getRow('FBFBBFFRLR')).to.equal(44);
      expect(getRow('BFFFBBFRRR')).to.equal(70);
      expect(getRow('BBFFBBFRLL')).to.equal(102);
      expect(getRow('FFFBBBFRRR')).to.equal(14);
    });
  });

  describe('getSeatId', () => {
    it('calculates seat ID', async () => {
      expect(getSeatId(70, 7)).to.equal(567);
      expect(getSeatId(102, 4)).to.equal(820);
      expect(getSeatId(14, 7)).to.equal(119);
    });
  });

  describe('main', () => {
    it('returns the highest id', async () => {
      const result = await main('day5/test-input');

      expect(result).to.equal(820);
    });
  });
});

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { main, solveExpression } = require('./day18-part-1');

describe('Day 18 - Part 1', () => {
  describe('solveExpression', () => {
    it('solves math expressions', async () => {
      expect(solveExpression('1')).to.equal(1);
      expect(solveExpression('1 + 1')).to.equal(2);
      expect(solveExpression('1 + 2 + 3')).to.equal(6);
      expect(solveExpression('1 * 2 * 3')).to.equal(6);
      expect(solveExpression('1 + 2 * 3')).to.equal(9);
      expect(solveExpression('2 * 3 + 1')).to.equal(7);
      expect(solveExpression('1 + 2 * 3 + 4 * 5 + 6')).to.equal(71);
      expect(solveExpression('(1 + 1)')).to.equal(2);
      expect(solveExpression('1 + (1)')).to.equal(2);
      expect(solveExpression('(1) + (1)')).to.equal(2);
      expect(solveExpression('2 * 2')).to.equal(4);
      expect(solveExpression('(2 * 2)')).to.equal(4);
      expect(solveExpression('2 * (2)')).to.equal(4);
      expect(solveExpression('(2) * (2)')).to.equal(4);
      expect(solveExpression('4 * (5 + 6)')).to.equal(44);
      expect(solveExpression('(4 * (5 + 6))')).to.equal(44);
      expect(solveExpression('1 + (2 * 3)')).to.equal(7);
      expect(solveExpression('(1 + 2) * 3')).to.equal(9);
      expect(solveExpression('(2 * 2) + (1 + 1)')).to.equal(6);
      expect(solveExpression('1 + (2 * 3) + (4 * (5 + 6))')).to.equal(51);
      expect(solveExpression('2 * 3 + (4 * 5)')).to.equal(26);
      expect(solveExpression('5 + (8 * 3 + 9 + 3 * 4 * 3)')).to.equal(437);
      expect(
        solveExpression('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')
      ).to.equal(12240);
      expect(
        solveExpression('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')
      ).to.equal(13632);
    });
  });

  describe('main', () => {
    it('returns the sum of all the solved expressions', async () => {
      const result = await main('day18/test-input');

      expect(result).to.equal(51 + 71 + 26 + 437 + 12240 + 13632);
    });
  });
});

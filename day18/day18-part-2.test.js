const { describe, it } = require('mocha');
const { expect } = require('chai');
const { solveExpression } = require('./day18-part-2');

describe('Day 18 - Part 2', () => {
  describe('solveExpression', () => {
    it('solves math expressions', async () => {
      expect(solveExpression('1 + 2 * 3 + 4 * 5 + 6')).to.equal(231);
      expect(solveExpression('1 + (2 * 3) + (4 * (5 + 6))')).to.equal(51);
      expect(solveExpression('2 * 3 + (4 * 5)')).to.equal(46);
      expect(solveExpression('5 + (8 * 3 + 9 + 3 * 4 * 3)')).to.equal(1445);
      expect(
        solveExpression('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')
      ).to.equal(669060);
      expect(
        solveExpression('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')
      ).to.equal(23340);
    });
  });
});

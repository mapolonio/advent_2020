const { describe, it } = require('mocha');
const { expect } = require('chai');
const {
  solveEqualtions,
  getFactors,
  getLeastCommonMult,
  main,
  getEquations
} = require('./day13-part-2');

describe('Day 13 - Part 2', () => {
  describe('getEquations', () => {
    it('transforms buses to x=r(mod m) equations', async () => {
      const result = getEquations('7,13,x,x,59,x,31,19');
      const resultB = getEquations('5,x,x,2');
      const resultC = getEquations('67,7,59,61');

      expect(result).to.deep.equal([
        { remainder: 0, modulo: 7 },
        { remainder: 12, modulo: 13 },
        { remainder: 55, modulo: 59 },
        { remainder: 25, modulo: 31 },
        { remainder: 12, modulo: 19 }
      ]);
      expect(resultB).to.deep.equal([
        { remainder: 0, modulo: 5 },
        { remainder: 1, modulo: 2 }
      ]);
      expect(resultC).to.deep.equal([
        { remainder: 0, modulo: 67 },
        { remainder: 6, modulo: 7 },
        { remainder: 57, modulo: 59 },
        { remainder: 58, modulo: 61 }
      ]);
    });
  });

  describe('getLeastCommonMult', () => {
    it('returns the LCM between the equations modulo', async () => {
      const equations = [
        { remainder: 0, modulo: 7 },
        { remainder: 12, modulo: 13 },
        { remainder: 55, modulo: 59 },
        { remainder: 25, modulo: 31 },
        { remainder: 12, modulo: 19 }
      ];

      expect(getLeastCommonMult(equations)).to.equal(7 * 13 * 59 * 31 * 19);
    });
  });

  describe('getFactors', () => {
    it('calculates multiplication of factors for an equation term', async () => {
      const lcm = 13 * 17 * 19;

      expect(getFactors({ remainder: 0, modulo: 17 }, lcm)).to.equal(0);
      expect(getFactors({ remainder: 11, modulo: 13 }, lcm)).to.equal(17 * 19);
      expect(getFactors({ remainder: 16, modulo: 19 }, lcm)).to.equal(
        17 * 13 * 14
      );
    });
  });

  describe('solveEqualtions', () => {
    it('uses Chinese remainders theorem to solve equations', async () => {
      const equationsA = getEquations('17,x,13,19');
      const equationsB = getEquations('67,7,59,61');
      const equationsC = getEquations('67,x,7,59,61');
      const equationsD = getEquations('67,7,x,59,61');
      const equationsE = getEquations('1789,37,47,1889');
      const equationsF = getEquations('7,13,x,x,59,x,31,19');

      expect(solveEqualtions(equationsA)).to.equal(3417);
      expect(solveEqualtions(equationsB)).to.equal(754018);
      expect(solveEqualtions(equationsC)).to.equal(779210);
      expect(solveEqualtions(equationsD)).to.equal(1261476);
      expect(solveEqualtions(equationsE)).to.equal(1202161486);
      expect(solveEqualtions(equationsF)).to.equal(1068781);
    });
  });

  describe('main', () => {
    it('returns the earliest valid timestamp', async () => {
      const result = await main('day13/test-input');

      expect(result).to.equal(1068781);
    });
  });
});

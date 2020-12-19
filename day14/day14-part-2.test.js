const { describe, it } = require('mocha');
const { expect } = require('chai');
const {
  applyMask,
  expandMask,
  getAddresses,
  processProgram
} = require('./day14-part-2');

describe('Day 14 - Part 2', () => {
  describe('expandMask', () => {
    it('returns all possible values for a mask', async () => {
      const result = expandMask('000000000000000000000000000000X1001X');

      expect(result).to.have.deep.members([
        '000000000000000000000000000000110011',
        '000000000000000000000000000000110010',
        '000000000000000000000000000000010011',
        '000000000000000000000000000000010010'
      ]);
    });
  });

  describe('applyMask', () => {
    it('overrides the bits of the input', async () => {
      expect(applyMask('000000000000000000000000000000X1001X', 42)).to.equal(
        '000000000000000000000000000000X1101X'
      );
      expect(applyMask('00000000000000000000000000000000X0XX', 26)).to.equal(
        '00000000000000000000000000000001X0XX'
      );
    });
  });

  describe('getAddresses', () => {
    it('returns all the possible addresses after applying a mask', async () => {
      const resultA = getAddresses('000000000000000000000000000000X1001X', 42);
      const resultB = getAddresses('00000000000000000000000000000000X0XX', 26);

      expect(resultA).to.have.deep.members([26, 27, 58, 59]);
      expect(resultB).to.have.deep.members([16, 17, 18, 19, 24, 25, 26, 27]);
    });
  });

  describe('processProgram', () => {
    it('returns an object representing the memory state after running instructions', async () => {
      const instructions = [
        {
          action: 'maskSet',
          value: '000000000000000000000000000000X1001X'
        },
        {
          action: 'memSet',
          address: 42,
          value: 100
        },
        {
          action: 'maskSet',
          value: '00000000000000000000000000000000X0XX'
        },
        {
          action: 'memSet',
          address: 26,
          value: 1
        }
      ];

      const result = processProgram(instructions);

      expect(result).to.deep.equal({
        58: 100,
        59: 100,
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1
      });
    });
  });
});

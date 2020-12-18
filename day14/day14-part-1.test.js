const { describe, it } = require('mocha');
const { expect } = require('chai');
const {
  applyMask,
  main,
  parseInstruction,
  processProgram,
  toBinary,
  toDecimal
} = require('./day14-part-1');

describe('Day 14 - Part 1', () => {
  describe('parseInstructions', () => {
    it('parses masks settings correctly', async () => {
      expect(
        parseInstruction('mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')
      ).to.deep.equal({
        action: 'maskSet',
        value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X'
      });
    });

    it('parses memory sets correctly', async () => {
      expect(parseInstruction('mem[7] = 101')).to.deep.equal({
        action: 'memSet',
        address: '7',
        value: 101
      });
    });
  });

  describe('toBinary', () => {
    it('returns the 36 binary representation of numbers', async () => {
      expect(toBinary(0)).to.equal('000000000000000000000000000000000000');
      expect(toBinary(1)).to.equal('000000000000000000000000000000000001');
      expect(toBinary(2)).to.equal('000000000000000000000000000000000010');
      expect(toBinary(3)).to.equal('000000000000000000000000000000000011');
      expect(toBinary(4)).to.equal('000000000000000000000000000000000100');
      expect(toBinary(5)).to.equal('000000000000000000000000000000000101');
      expect(toBinary(11)).to.equal('000000000000000000000000000000001011');
    });
  });

  describe('toDecimal', () => {
    it('returns the decimal representation of 36 bit binary numbers', async () => {
      expect(toDecimal('000000000000000000000000000000000000')).to.equal(0);
      expect(toDecimal('000000000000000000000000000000000001')).to.equal(1);
      expect(toDecimal('000000000000000000000000000000000010')).to.equal(2);
      expect(toDecimal('000000000000000000000000000000000011')).to.equal(3);
      expect(toDecimal('000000000000000000000000000000000100')).to.equal(4);
      expect(toDecimal('000000000000000000000000000000000101')).to.equal(5);
    });
  });

  describe('applyMask', () => {
    it('sets the zeroes and ones of the mask to the provided value', async () => {
      const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';

      expect(applyMask(mask, 11)).to.equal(73);
      expect(applyMask(mask, 101)).to.equal(101);
      expect(applyMask(mask, 0)).to.equal(64);
    });
  });

  describe('processProgram', () => {
    it('returns an object representing the memory state after running instructions', async () => {
      const instructions = [
        {
          action: 'maskSet',
          value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X'
        },
        {
          action: 'memSet',
          address: '8',
          value: 11
        },
        {
          action: 'memSet',
          address: '7',
          value: 101
        },
        {
          action: 'memSet',
          address: '8',
          value: 0
        }
      ];

      const result = processProgram(instructions);

      expect(result).to.deep.equal({
        7: 101,
        8: 64
      });
    });
  });

  describe('main', () => {
    it('returns the sum of the contents of the memory after running a program', async () => {
      const result = await main('day14/test-input');

      expect(result).to.equal(165);
    });
  });
});

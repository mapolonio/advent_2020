const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getAlternativeInstructions, main } = require('./day8-part-2');

describe('Day 8 - Part 2', () => {
  describe('getAlternativeInstructions', () => {
    it('returns a new set of instructions and a new execution stack', async () => {
      expect(
        getAlternativeInstructions(
          ['nop +0', 'acc +1', 'jmp +4'],
          0,
          new Set([1, 2, 3])
        )
      ).to.deep.equal({
        alternateInstructions: ['jmp +0', 'acc +1', 'jmp +4'],
        alternativeStack: new Set([1, 2, 3])
      });
      expect(
        getAlternativeInstructions(
          ['nop +0', 'acc +1', 'jmp +4'],
          1,
          new Set([1, 2, 3])
        )
      ).to.deep.equal({
        alternateInstructions: ['nop +0', 'acc +1', 'jmp +4'],
        alternativeStack: new Set([1, 2, 3])
      });
      expect(
        getAlternativeInstructions(
          ['nop +0', 'acc +1', 'jmp -4'],
          2,
          new Set([1, 2, 3])
        )
      ).to.deep.equal({
        alternateInstructions: ['nop +0', 'acc +1', 'nop -4'],
        alternativeStack: new Set([1, 2, 3])
      });
    });
  });

  describe('main', () => {
    it('replaces a single operation until the set of instructions is valid and returns the result', async () => {
      const result = await main('day8/test-input');

      expect(result).to.equal(8);
    });
  });
});

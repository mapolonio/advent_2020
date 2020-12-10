const { describe, it } = require('mocha');
const { expect } = require('chai');
const { main, processInstruction } = require('./day8-part-1');

describe('Day 8 - Part 1', () => {
  describe('processInstruction', () => {
    it('processes nop correctly', async () => {
      expect(processInstruction('nop +0', 1, 10)).to.deep.equal({
        nextIndex: 2,
        acc: 10
      });
    });

    it('processes acc correctly', async () => {
      expect(processInstruction('acc -99', 1, 10)).to.deep.equal({
        nextIndex: 2,
        acc: -89
      });
    });

    it('processes jmp correctly', async () => {
      expect(processInstruction('jmp -3', 1, 10)).to.deep.equal({
        nextIndex: -2,
        acc: 10
      });
    });
  });

  describe('main', () => {
    it('returns the last value of acc before starting to loop', async () => {
      const result = await main('day8/test-input');

      expect(result).to.equal(5);
    });
  });
});

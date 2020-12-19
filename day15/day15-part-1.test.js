const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { initializeMemory, parseInput, playGame } = require('./day15-part-1');

describe('Day 15 - Part 1', () => {
  describe('parseInput', () => {
    it('returns the initia list of numbers', async () => {
      const result = await getInput('day15/test-input', parseInput);

      expect(result).to.deep.equal([0, 3, 6]);
    });
  });

  describe('initializeMemory', () => {
    it('returns an object with the turns where initial numbers were spoken', () => {
      expect(initializeMemory([0, 3, 6])).to.deep.equal({
        0: { last: 1, prev: 1 },
        3: { last: 2, prev: 2 },
        6: { last: 3, prev: 3 }
      });
    });
  });

  describe('playGame', () => {
    it('returns the last spoken number at the given turn', async () => {
      const gameA = [0, 3, 6];
      const gameB = [1, 3, 2];
      const gameC = [2, 1, 3];
      const gameD = [1, 2, 3];
      const gameE = [2, 3, 1];
      const gameF = [3, 2, 1];
      const gameG = [3, 1, 2];

      expect(playGame(gameA, 1)).to.equal(0);
      expect(playGame(gameA, 2)).to.equal(3);
      expect(playGame(gameA, 3)).to.equal(6);
      expect(playGame(gameA, 4)).to.equal(0);
      expect(playGame(gameA, 5)).to.equal(3);
      expect(playGame(gameA, 6)).to.equal(3);
      expect(playGame(gameA, 7)).to.equal(1);
      expect(playGame(gameA, 8)).to.equal(0);
      expect(playGame(gameA, 9)).to.equal(4);
      expect(playGame(gameA, 10)).to.equal(0);

      expect(playGame(gameB, 2020)).to.equal(1);
      expect(playGame(gameC, 2020)).to.equal(10);
      expect(playGame(gameD, 2020)).to.equal(27);
      expect(playGame(gameE, 2020)).to.equal(78);
      expect(playGame(gameF, 2020)).to.equal(438);
      expect(playGame(gameG, 2020)).to.equal(1836);
    });
  });
});

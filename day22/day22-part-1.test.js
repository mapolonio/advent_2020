const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { Deck, main, parseInput } = require('./day22-part-1');

describe('Day 22 - Part 1', () => {
  describe('parseInput', () => {
    it('parses the input into arrays', async () => {
      const result = await getInput('day22/test-input', parseInput);

      expect(result).to.deep.equal([
        [9, 2, 6, 3, 1],
        [5, 8, 4, 7, 10]
      ]);
    });
  });

  describe('Deck', () => {
    it('can be used to simulate a game', async () => {
      const playerA = new Deck([9, 2, 6, 3, 1]);

      expect(playerA.cards).to.deep.equal([9, 2, 6, 3, 1]);
      expect(playerA.take()).to.equal(9);
      expect(playerA.cards).to.deep.equal([2, 6, 3, 1]);
      expect(playerA.take()).to.equal(2);
      expect(playerA.cards).to.deep.equal([6, 3, 1]);

      playerA.addToBottom([9, 2]);

      expect(playerA.cards).to.deep.equal([6, 3, 1, 9, 2]);
    });
  });

  describe('main', () => {
    it('returns the score of the winning player', async () => {
      const result = await main('day22/test-input');

      expect(result).to.equal(306);
    });
  });
});

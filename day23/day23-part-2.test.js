const { describe, it } = require('mocha');
const { expect } = require('chai');
const { CupGame, main } = require('./day23-part-2');

describe('Day 23 - Part 2', () => {
  describe('CupGame', () => {
    it('can simulate a game move', () => {
      const game = new CupGame([3, 8, 9, 1, 2, 5, 4, 6, 7]);

      expect(game.currentCup.label).to.equal(3);
      circularEquality(game.cupArray, [3, 8, 9, 1, 2, 5, 4, 6, 7]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(2);
      circularEquality(game.cupArray, [3, 2, 8, 9, 1, 5, 4, 6, 7]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(5);
      circularEquality(game.cupArray, [3, 2, 5, 4, 6, 7, 8, 9, 1]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(8);
      circularEquality(game.cupArray, [3, 4, 6, 7, 2, 5, 8, 9, 1]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(4);
      circularEquality(game.cupArray, [3, 2, 5, 8, 4, 6, 7, 9, 1]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(1);
      circularEquality(game.cupArray, [9, 2, 5, 8, 4, 1, 3, 6, 7]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(9);
      circularEquality(game.cupArray, [7, 2, 5, 8, 4, 1, 9, 3, 6]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(2);
      circularEquality(game.cupArray, [8, 3, 6, 7, 4, 1, 9, 2, 5]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(6);
      circularEquality(game.cupArray, [7, 4, 1, 5, 8, 3, 9, 2, 6]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(5);
      circularEquality(game.cupArray, [5, 7, 4, 1, 8, 3, 9, 2, 6]);

      game.makeMove();

      expect(game.currentCup.label).to.equal(8);
      circularEquality(game.cupArray, [5, 8, 3, 7, 4, 1, 9, 2, 6]);
    });
  });

  describe('main', () => {
    it('returns the multiplication of the two cups clockwise to cup 1 after 10 million moves', function () {
      this.timeout(0);
      const result = main('389125467');

      expect(result).to.equal(149245887792);
    });
  });
});

const circularEquality = (result, expected) => {
  expect(result.length).to.equal(result.length);

  const [first] = expected;
  const resultStart = result.indexOf(first);

  for (let i = 0, j = resultStart; i < expected.length; i += 1, j += 1) {
    if (j >= result.length) {
      j = 0;
    }

    expect(result[j]).to.equal(expected[i]);
  }
};

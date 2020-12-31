const { describe, it } = require('mocha');
const { expect } = require('chai');
const { CupGame, main } = require('./day23-part-1');

describe('Day 23 - Part 1', () => {
  describe('CupGame', () => {
    it('can simulate a game move', () => {
      const game = new CupGame([3, 8, 9, 1, 2, 5, 4, 6, 7]);

      expect(game.currentCup).to.equal(3);
      circularEquality(game.cups, [3, 8, 9, 1, 2, 5, 4, 6, 7]);

      game.makeMove();

      expect(game.currentCup).to.equal(2);
      circularEquality(game.cups, [3, 2, 8, 9, 1, 5, 4, 6, 7]);

      game.makeMove();

      expect(game.currentCup).to.equal(5);
      circularEquality(game.cups, [3, 2, 5, 4, 6, 7, 8, 9, 1]);

      game.makeMove();

      expect(game.currentCup).to.equal(8);
      circularEquality(game.cups, [3, 4, 6, 7, 2, 5, 8, 9, 1]);

      game.makeMove();

      expect(game.currentCup).to.equal(4);
      circularEquality(game.cups, [3, 2, 5, 8, 4, 6, 7, 9, 1]);

      game.makeMove();

      expect(game.currentCup).to.equal(1);
      circularEquality(game.cups, [9, 2, 5, 8, 4, 1, 3, 6, 7]);

      game.makeMove();

      expect(game.currentCup).to.equal(9);
      circularEquality(game.cups, [7, 2, 5, 8, 4, 1, 9, 3, 6]);

      game.makeMove();

      expect(game.currentCup).to.equal(2);
      circularEquality(game.cups, [8, 3, 6, 7, 4, 1, 9, 2, 5]);

      game.makeMove();

      expect(game.currentCup).to.equal(6);
      circularEquality(game.cups, [7, 4, 1, 5, 8, 3, 9, 2, 6]);

      game.makeMove();

      expect(game.currentCup).to.equal(5);
      circularEquality(game.cups, [5, 7, 4, 1, 8, 3, 9, 2, 6]);

      game.makeMove();

      expect(game.currentCup).to.equal(8);
      circularEquality(game.cups, [5, 8, 3, 7, 4, 1, 9, 2, 6]);
    });
  });

  describe('main', () => {
    it('returns the labeling after playing the provided rounds of the game', () => {
      const result = main('389125467', 10);

      expect(result).to.equal('92658374');
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

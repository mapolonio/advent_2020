const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getFirstSeat, main } = require('./day11-part-2');

describe('Day 11 - Part 2', () => {
  describe('getFirstSeat', () => {
    it('returns the first seat found from row,col', async () => {
      const layoutA = [
        '.......#.'.split(''),
        '...#.....'.split(''),
        '.#.......'.split(''),
        '.........'.split(''),
        '..#L....#'.split(''),
        '....#....'.split(''),
        '.........'.split(''),
        '#........'.split(''),
        '...#.....'.split('')
      ];
      const layoutB = [
        '.............'.split(''),
        '.L.L.#.#.#.#.'.split(''),
        '.............'.split('')
      ];
      const layoutC = [
        '.##.##.'.split(''),
        '#.#.#.#'.split(''),
        '##...##'.split(''),
        '...L...'.split(''),
        '##...##'.split(''),
        '#.#.#.#'.split(''),
        '.##.##.'.split('')
      ];

      expect(getFirstSeat(layoutA, 'up-left', 4, 3)).to.equal('#');
      expect(getFirstSeat(layoutA, 'up', 4, 3)).to.equal('#');
      expect(getFirstSeat(layoutA, 'up-right', 4, 3)).to.equal('#');
      expect(getFirstSeat(layoutA, 'right', 4, 3)).to.equal('#');
      expect(getFirstSeat(layoutA, 'down-right', 4, 3)).to.equal('#');
      expect(getFirstSeat(layoutA, 'down', 4, 3)).to.equal('#');
      expect(getFirstSeat(layoutA, 'down-left', 4, 3)).to.equal('#');
      expect(getFirstSeat(layoutA, 'left', 4, 3)).to.equal('#');

      expect(getFirstSeat(layoutB, 'up-left', 1, 1)).be.null;
      expect(getFirstSeat(layoutB, 'up', 1, 1)).be.null;
      expect(getFirstSeat(layoutB, 'up-right', 1, 1)).be.null;
      expect(getFirstSeat(layoutB, 'right', 1, 1)).to.equal('L');
      expect(getFirstSeat(layoutB, 'down-right', 1, 1)).be.null;
      expect(getFirstSeat(layoutB, 'down', 1, 1)).be.null;
      expect(getFirstSeat(layoutB, 'down-left', 1, 1)).be.null;
      expect(getFirstSeat(layoutB, 'left', 1, 1)).be.null;

      expect(getFirstSeat(layoutC, 'up-left', 3, 3)).be.null;
      expect(getFirstSeat(layoutC, 'up', 3, 3)).be.null;
      expect(getFirstSeat(layoutC, 'up-right', 3, 3)).be.null;
      expect(getFirstSeat(layoutC, 'right', 3, 3)).to.be.null;
      expect(getFirstSeat(layoutC, 'down-right', 3, 3)).be.null;
      expect(getFirstSeat(layoutC, 'down', 3, 3)).be.null;
      expect(getFirstSeat(layoutC, 'down-left', 3, 3)).be.null;
      expect(getFirstSeat(layoutC, 'left', 3, 3)).be.null;
    });
  });

  describe('main', () => {
    it('returns the number of occupied seats after the seat layout stops changing', async () => {
      const result = await main('day11/test-input');

      expect(result).to.equal(26);
    });
  });
});

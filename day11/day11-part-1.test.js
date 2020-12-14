const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { main, parseInput, processLayout } = require('./day11-part-1');

describe('Day 11 - Part 1', () => {
  describe('processLayout', () => {
    it('returns the layout status and number of occupied and changed seats after one round', async () => {
      const initialLayout = await getInput('day11/test-input', parseInput);

      const firstRound = processLayout(initialLayout);
      const secondRound = processLayout(firstRound.layout);
      const thirdRound = processLayout(secondRound.layout);
      const fourthRound = processLayout(thirdRound.layout);
      const fifthRound = processLayout(fourthRound.layout);
      const sixthRound = processLayout(fifthRound.layout);

      expect(firstRound.layout).to.deep.equal([
        '#.##.##.##'.split(''),
        '#######.##'.split(''),
        '#.#.#..#..'.split(''),
        '####.##.##'.split(''),
        '#.##.##.##'.split(''),
        '#.#####.##'.split(''),
        '..#.#.....'.split(''),
        '##########'.split(''),
        '#.######.#'.split(''),
        '#.#####.##'.split('')
      ]);
      expect(secondRound.layout).to.deep.equal([
        '#.LL.L#.##'.split(''),
        '#LLLLLL.L#'.split(''),
        'L.L.L..L..'.split(''),
        '#LLL.LL.L#'.split(''),
        '#.LL.LL.LL'.split(''),
        '#.LLLL#.##'.split(''),
        '..L.L.....'.split(''),
        '#LLLLLLLL#'.split(''),
        '#.LLLLLL.L'.split(''),
        '#.#LLLL.##'.split('')
      ]);
      expect(thirdRound.layout).to.deep.equal([
        '#.##.L#.##'.split(''),
        '#L###LL.L#'.split(''),
        'L.#.#..#..'.split(''),
        '#L##.##.L#'.split(''),
        '#.##.LL.LL'.split(''),
        '#.###L#.##'.split(''),
        '..#.#.....'.split(''),
        '#L######L#'.split(''),
        '#.LL###L.L'.split(''),
        '#.#L###.##'.split('')
      ]);
      expect(fourthRound.layout).to.deep.equal([
        '#.#L.L#.##'.split(''),
        '#LLL#LL.L#'.split(''),
        'L.L.L..#..'.split(''),
        '#LLL.##.L#'.split(''),
        '#.LL.LL.LL'.split(''),
        '#.LL#L#.##'.split(''),
        '..L.L.....'.split(''),
        '#L#LLLL#L#'.split(''),
        '#.LLLLLL.L'.split(''),
        '#.#L#L#.##'.split('')
      ]);
      expect(fifthRound.layout).to.deep.equal([
        '#.#L.L#.##'.split(''),
        '#LLL#LL.L#'.split(''),
        'L.#.L..#..'.split(''),
        '#L##.##.L#'.split(''),
        '#.#L.LL.LL'.split(''),
        '#.#L#L#.##'.split(''),
        '..L.L.....'.split(''),
        '#L#L##L#L#'.split(''),
        '#.LLLLLL.L'.split(''),
        '#.#L#L#.##'.split('')
      ]);
      expect(sixthRound.layout).to.deep.equal(fifthRound.layout);
      expect(sixthRound.changedSeats).to.equal(0);
      expect(sixthRound.occupiedSeats).to.equal(37);
    });
  });

  describe('main', () => {
    it('returns the number of occupied seats after the seat layout stops changing', async () => {
      const result = await main('day11/test-input');

      expect(result).to.equal(37);
    });
  });
});

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { flipTile, main, parseInput, rotateTile } = require('./day20-part-1');

describe('Day 20 - Part 1', () => {
  describe('parseInput', () => {
    it('parses input into an array of objects', () => {
      const input = [
        'Tile 2311:',
        '..##.#..#.',
        '##..#.....',
        '#...##..#.',
        '####.#...#',
        '##.##.###.',
        '##...#.###',
        '.#.#.#..##',
        '..#....#..',
        '###...#.#.',
        '..###..###',
        '',
        'Tile 1951:',
        '#.##...##.',
        '#.####...#',
        '.....#..##',
        '#...######',
        '.##.#....#',
        '.###.#####',
        '###.##.##.',
        '.###....#.',
        '..#.#..#.#',
        '#...##.#..'
      ].join('\n');

      const result = parseInput(input);

      expect(result).to.deep.equal([
        {
          id: '2311',
          northBorder: '..##.#..#.',
          southBorder: '..###..###',
          eastBorder: '...#.##..#',
          westBorder: '.#####..#.'
        },
        {
          id: '1951',
          northBorder: '#.##...##.',
          southBorder: '#...##.#..',
          eastBorder: '.#####..#.',
          westBorder: '##.#..#..#'
        }
      ]);
    });
  });

  describe('rotateTile', () => {
    it('rotates a tile 90 degrees clockwise', async () => {
      const tile = {
        id: '2311',
        northBorder: '0123456789',
        southBorder: '0abcdefgh9',
        eastBorder: '9123456789',
        westBorder: '0123456780'
      };

      const resultA = rotateTile(tile);
      const resultB = rotateTile(resultA);
      const resultC = rotateTile(resultB);
      const resultD = rotateTile(resultC);

      expect(resultA).to.deep.equal({
        id: '2311',
        northBorder: '0876543210',
        southBorder: '9876543219',
        eastBorder: '0123456789',
        westBorder: '0abcdefgh9'
      });
      expect(resultD).to.deep.equal(tile);
    });
  });

  describe('flipTile', () => {
    it('flips a tile', async () => {
      const tile = {
        id: '2311',
        northBorder: '0123456789',
        southBorder: '0abcdefgh9',
        eastBorder: '9123456789',
        westBorder: '0123456780'
      };

      const resultA = flipTile(tile);
      const resultB = flipTile(resultA);

      expect(resultA).to.deep.equal({
        id: '2311',
        northBorder: '0abcdefgh9',
        southBorder: '0123456789',
        eastBorder: '9876543219',
        westBorder: '0876543210'
      });
      expect(resultB).to.deep.equal(tile);
    });
  });

  describe('main', () => {
    it('returns the multiplication of the IDs of the corner tiles', async () => {
      const result = await main('day20/test-input');

      expect(result).to.deep.equal(20899048083289);
    });
  });
});

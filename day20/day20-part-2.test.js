const { describe, it } = require('mocha');
const { expect } = require('chai');
const {
  countMonsters,
  flipTile,
  main,
  mergeTiles,
  parseInput,
  rotateTile
} = require('./day20-part-2');

describe('Day 20 - Part 2', () => {
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
        '..###..###'
      ].join('\n');

      const result = parseInput(input);

      expect(result).to.deep.equal([
        {
          id: '2311',
          northBorder: '..##.#..#.',
          southBorder: '..###..###',
          eastBorder: '...#.##..#',
          westBorder: '.#####..#.',
          image: [
            '#..#....'.split(''),
            '...##..#'.split(''),
            '###.#...'.split(''),
            '#.##.###'.split(''),
            '#...#.##'.split(''),
            '#.#.#..#'.split(''),
            '.#....#.'.split(''),
            '##...#.#'.split('')
          ]
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
        westBorder: '0123456780',
        image: [
          '12345678'.split(''),
          'abcdefgh'.split(''),
          'xxxxyyyy'.split(''),
          '87654321'.split(''),
          'hgfedcba'.split(''),
          '....####'.split(''),
          'ABCDEFGH'.split(''),
          'HGFEDCBA'.split('')
        ]
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
        westBorder: '0abcdefgh9',
        image: [
          'HA.h8xa1'.split(''),
          'GB.g7xb2'.split(''),
          'FC.f6xc3'.split(''),
          'ED.e5xd4'.split(''),
          'DE#d4ye5'.split(''),
          'CF#c3yf6'.split(''),
          'BG#b2yg7'.split(''),
          'AH#a1yh8'.split('')
        ]
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
        westBorder: '0123456780',
        image: [
          '12345678'.split(''),
          'abcdefgh'.split(''),
          'xxxxyyyy'.split(''),
          '87654321'.split(''),
          'hgfedcba'.split(''),
          '....####'.split(''),
          'ABCDEFGH'.split(''),
          'HGFEDCBA'.split('')
        ]
      };

      const resultA = flipTile(tile);
      const resultB = flipTile(resultA);

      expect(resultA).to.deep.equal({
        id: '2311',
        northBorder: '0abcdefgh9',
        southBorder: '0123456789',
        eastBorder: '9876543219',
        westBorder: '0876543210',
        image: [
          'HGFEDCBA'.split(''),
          'ABCDEFGH'.split(''),
          '....####'.split(''),
          'hgfedcba'.split(''),
          '87654321'.split(''),
          'xxxxyyyy'.split(''),
          'abcdefgh'.split(''),
          '12345678'.split('')
        ]
      });
      expect(resultB).to.deep.equal(tile);
    });
  });

  describe('mergeTiles', () => {
    it('merges tile images into a single matrix', async () => {
      const topRow = [
        {
          row: 1,
          col: -1,
          image: ['123'.split(''), 'abc'.split(''), 'ABC'.split('')]
        },
        {
          row: 1,
          col: 0,
          image: ['456'.split(''), 'def'.split(''), 'DEF'.split('')]
        },
        {
          row: 1,
          col: 1,
          image: ['789'.split(''), 'ghi'.split(''), 'GHI'.split('')]
        }
      ];
      const middleRow = [
        {
          row: 0,
          col: -1,
          image: ['xxx'.split(''), 'yyy'.split(''), 'zzz'.split('')]
        },
        {
          row: 0,
          col: 0,
          image: ['XXX'.split(''), 'YYY'.split(''), 'ZZZ'.split('')]
        },
        {
          row: 0,
          col: 1,
          image: ['xxx'.split(''), 'yyy'.split(''), 'zzz'.split('')]
        }
      ];
      const bottomRow = [
        {
          row: -1,
          col: -1,
          image: ['XXX'.split(''), 'YYY'.split(''), 'ZZZ'.split('')]
        },
        {
          row: -1,
          col: 0,
          image: ['xxx'.split(''), 'yyy'.split(''), 'zzz'.split('')]
        },
        {
          row: -1,
          col: 1,
          image: ['XXX'.split(''), 'YYY'.split(''), 'ZZZ'.split('')]
        }
      ];
      const tiles = [...topRow, ...middleRow, ...bottomRow];

      const result = mergeTiles(tiles);

      expect(result).to.deep.equal([
        '123456789'.split(''),
        'abcdefghi'.split(''),
        'ABCDEFGHI'.split(''),
        'xxxXXXxxx'.split(''),
        'yyyYYYyyy'.split(''),
        'zzzZZZzzz'.split(''),
        'XXXxxxXXX'.split(''),
        'YYYyyyYYY'.split(''),
        'ZZZzzzZZZ'.split('')
      ]);
    });
  });

  describe('countMonsters', () => {
    it('returns the number of sea monsters in an image', async () => {
      const seaMonster = [
        '                  # ',
        '#    ##    ##    ###',
        ' #  #  #  #  #  #   '
      ];
      const imageA = [
        '                  # '.split(''),
        '#    ##    ##    ###'.split(''),
        ' #  #  #  #  #  #   '.split('')
      ];

      expect(countMonsters(imageA, seaMonster)).to.equal(1);
    });
  });

  describe('main', () => {
    it('returns the number of # symbols that do not belong to monsters in an image', async () => {
      const result = await main('day20/test-input');

      expect(result).to.deep.equal(273);
    });
  });
});

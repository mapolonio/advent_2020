const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { getTileCoord, main, parseInput } = require('./day24-part-1');

describe('Day 24 - Part 1', () => {
  describe('parseInput', () => {
    it('parses tile paths', async () => {
      const result = await getInput('day24/test-input', parseInput);

      expect(result).to.deep.equal([
        'se,se,nw,ne,ne,ne,w,se,e,sw,w,sw,sw,w,ne,ne,w,se,w,sw'.split(','),
        'ne,e,e,ne,se,nw,nw,w,sw,ne,ne,w,nw,w,se,w,ne,nw,se,sw,e,sw'.split(','),
        'se,sw,ne,sw,sw,se,nw,w,nw,se'.split(','),
        'nw,nw,ne,se,e,sw,sw,ne,ne,w,ne,sw,w,ne,w,se,sw,ne,se,e,ne'.split(','),
        'sw,w,e,sw,ne,sw,ne,nw,se,w,nw,ne,ne,se,e,nw'.split(','),
        'e,e,se,nw,se,sw,sw,ne,nw,sw,nw,nw,se,w,w,nw,se,ne'.split(','),
        'se,w,ne,ne,ne,ne,se,nw,se,w,ne,nw,w,w,se'.split(','),
        'w,e,nw,w,w,e,se,e,e,w,e,sw,w,w,nw,w,e'.split(','),
        'w,sw,e,e,se,ne,ne,w,nw,w,nw,se,ne,w,se,nw,w,se,se,se,nw,ne'.split(','),
        'ne,e,sw,se,e,nw,w,sw,nw,sw,sw,nw'.split(','),
        'ne,nw,sw,w,se,w,sw,ne,ne,ne,w,se,nw,se,nw,ne,se,se,ne,w'.split(','),
        'e,ne,w,nw,e,w,ne,sw,se,w,nw,sw,e,nw,e,sw,ne,nw,se,nw,sw'.split(','),
        'sw,e,ne,sw,ne,sw,ne,ne,e,nw,ne,w,e,ne,w,w,ne,sw,sw,ne,se'.split(','),
        'sw,w,e,se,ne,se,w,e,nw,ne,sw,nw,w,ne,se,sw,w,ne'.split(','),
        'e,ne,se,nw,sw,w,sw,ne,ne,sw,se,nw,ne,w,sw,se,e,nw,se,se'.split(','),
        'w,nw,ne,se,ne,se,ne,nw,w,ne,nw,se,w,e,se,w,se,se,se,w'.split(','),
        'ne,ne,w,sw,nw,e,w,sw,ne,ne,se,nw,ne,se,w,e,sw'.split(','),
        'e,ne,sw,nw,sw,nw,se,ne,nw,nw,nw,w,se,e,sw,ne,e,w,se,ne,se'.split(','),
        'ne,sw,nw,e,w,nw,nw,se,e,nw,se,e,se,w,se,nw,sw,e,e,w,e'.split(','),
        'w,se,w,e,e,e,nw,ne,se,nw,w,w,sw,ne,w'.split(',')
      ]);
    });
  });

  describe('getTileCoord', () => {
    it('returns a tile x and y coordinates', () => {
      const result = getTileCoord(['nw', 'w', 'sw', 'e', 'e']);

      expect(result).to.deep.equal({
        xCoord: 0,
        yCoord: 0
      });
    });
  });

  describe('main', () => {
    it('returns the total number of black tiles', async () => {
      const result = await main('day24/test-input');

      expect(result).to.equal(10);
    });
  });
});

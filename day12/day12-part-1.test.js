const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { getNextPosition, move, parseInput } = require('./day12-part-1');

describe('Day 12 - Part 1', () => {
  describe('parseInput', () => {
    it('parses actions', async () => {
      const result = await getInput('day12/test-input', parseInput);

      expect(result).to.deep.equal([
        { action: 'F', value: 10 },
        { action: 'N', value: 3 },
        { action: 'F', value: 7 },
        { action: 'R', value: 90 },
        { action: 'F', value: 11 }
      ]);
    });
  });

  describe('move', () => {
    it('moves ship correctly to North', async () => {
      expect(move({ direction: 'E', lat: 0, lng: 0 }, 'N', 0)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: 0
      });
      expect(move({ direction: 'E', lat: 0, lng: 0 }, 'N', 15)).to.deep.equal({
        direction: 'E',
        lat: 15,
        lng: 0
      });
      expect(move({ direction: 'E', lat: -5, lng: 0 }, 'N', 15)).to.deep.equal({
        direction: 'E',
        lat: 10,
        lng: 0
      });
      expect(move({ direction: 'E', lat: -5, lng: 0 }, 'N', -15)).to.deep.equal(
        {
          direction: 'E',
          lat: -20,
          lng: 0
        }
      );
      expect(move({ direction: 'E', lat: 5, lng: 0 }, 'N', -15)).to.deep.equal({
        direction: 'E',
        lat: -10,
        lng: 0
      });
    });

    it('moves ship correctly to South', async () => {
      expect(move({ direction: 'E', lat: 0, lng: 0 }, 'S', 0)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: 0
      });
      expect(move({ direction: 'E', lat: 0, lng: 0 }, 'S', 15)).to.deep.equal({
        direction: 'E',
        lat: -15,
        lng: 0
      });
      expect(move({ direction: 'E', lat: -5, lng: 0 }, 'S', 15)).to.deep.equal({
        direction: 'E',
        lat: -20,
        lng: 0
      });
      expect(move({ direction: 'E', lat: -5, lng: 0 }, 'S', -15)).to.deep.equal(
        {
          direction: 'E',
          lat: 10,
          lng: 0
        }
      );
      expect(move({ direction: 'E', lat: 5, lng: 0 }, 'S', -15)).to.deep.equal({
        direction: 'E',
        lat: 20,
        lng: 0
      });
    });

    it('moves ship correctly to E', async () => {
      expect(move({ direction: 'E', lat: 0, lng: 0 }, 'E', 0)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: 0
      });
      expect(move({ direction: 'E', lat: 0, lng: 0 }, 'E', 15)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: 15
      });
      expect(move({ direction: 'E', lat: 0, lng: -5 }, 'E', 15)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: 10
      });
      expect(move({ direction: 'E', lat: 0, lng: -5 }, 'E', -15)).to.deep.equal(
        {
          direction: 'E',
          lat: 0,
          lng: -20
        }
      );
      expect(move({ direction: 'E', lat: 0, lng: 5 }, 'E', -15)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: -10
      });
    });

    it('moves ship correctly to W', async () => {
      expect(move({ direction: 'E', lat: 0, lng: 0 }, 'W', 0)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: 0
      });
      expect(move({ direction: 'E', lat: 0, lng: 0 }, 'W', 15)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: -15
      });
      expect(move({ direction: 'E', lat: 0, lng: -5 }, 'W', 15)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: -20
      });
      expect(move({ direction: 'E', lat: 0, lng: -5 }, 'W', -15)).to.deep.equal(
        {
          direction: 'E',
          lat: 0,
          lng: 10
        }
      );
      expect(move({ direction: 'E', lat: 0, lng: 5 }, 'W', -15)).to.deep.equal({
        direction: 'E',
        lat: 0,
        lng: 20
      });
    });
  });

  describe('getNextPosition', () => {
    it('returns the ship new position and direction after one directive', async () => {
      const ship = { lat: 0, lng: 0, direction: 'E' };

      const resultA = getNextPosition(ship, 'F', 10);
      const resultB = getNextPosition(resultA, 'N', 3);
      const resultC = getNextPosition(resultB, 'F', 7);
      const resultD = getNextPosition(resultC, 'R', 90);
      const resultE = getNextPosition(resultD, 'F', 11);

      expect(resultA).to.deep.equal({ lat: 0, lng: 10, direction: 'E' });
      expect(resultB).to.deep.equal({ lat: 3, lng: 10, direction: 'E' });
      expect(resultC).to.deep.equal({ lat: 3, lng: 17, direction: 'E' });
      expect(resultD).to.deep.equal({ lat: 3, lng: 17, direction: 'S' });
      expect(resultE).to.deep.equal({ lat: -8, lng: 17, direction: 'S' });
    });
  });
});

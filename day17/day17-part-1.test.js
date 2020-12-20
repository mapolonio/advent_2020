const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const { main, parseInput, simulateCycle } = require('./day17-part-1');

describe('Day 17 - Part 1', () => {
  describe('parseInput', () => {
    it('returns an object representing the active cubes', async () => {
      const result = await getInput('day17/test-input', parseInput);

      expect(result).to.deep.equal({
        '0,0,1': true,
        '0,1,2': true,
        '0,2,0': true,
        '0,2,1': true,
        '0,2,2': true
      });
    });
  });

  describe('simulateCycle', () => {
    it('returns the status of the cube map after one cycle', async () => {
      const cubeMap = await getInput('day17/test-input', parseInput);

      const result = simulateCycle(cubeMap);

      expect(result).to.deep.equal({
        '-1,1,0': true,
        '-1,2,2': true,
        '-1,3,1': true,
        '0,1,0': true,
        '0,1,2': true,
        '0,2,1': true,
        '0,2,2': true,
        '0,3,1': true,
        '1,1,0': true,
        '1,2,2': true,
        '1,3,1': true
      });
    });
  });

  describe('main', () => {
    it('returns the number of active cubes after six cycles', async () => {
      const result = await main('day17/test-input');

      expect(result).to.equal(112);
    });
  });
});

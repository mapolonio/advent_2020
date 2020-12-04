const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getInput } = require('../utils');
const {
  isValidPassport,
  isValidByr,
  isValidHgt,
  isValidHcl,
  isValidEcl,
  isValidPid,
  parseInput,
} = require('./day4-part-2');

describe('Day 4 - Part 2', () => {
  describe('Valid passports', () => {
    it('Validates all valid passports', async () => {
      const validPassports = await getInput('day4/valid-passports', parseInput);
      const result = validPassports.filter(isValidPassport);

      if (result.length !== validPassports.length) {
        throw new Error('test 1 failed!');
      }

      expect(result.length).to.equal(validPassports.length);
    });
  });

  describe('Invalid passports', () => {
    it('Invalidates all invalid passports', async () => {
      const invalidPassports = await getInput(
        'day4/invalid-passports',
        parseInput
      );
      const result = invalidPassports.filter(isValidPassport);

      expect(result.length).to.equal(0);
    });
  });

  describe('Field validators', () => {
    it('isValidByr', () => {
      expect(isValidByr('2002')).to.equal(true);
      expect(isValidByr('2003')).to.equal(false);
    });

    it('isValidHgt', () => {
      expect(isValidHgt('60in')).to.equal(true);
      expect(isValidHgt('190cm')).to.equal(true);
      expect(isValidHgt('190in')).to.equal(false);
      expect(isValidHgt('190')).to.equal(false);
    });

    it('isValidHcl', () => {
      expect(isValidHcl('#123abc')).to.equal(true);
      expect(isValidHcl('#123abz')).to.equal(false);
      expect(isValidHcl('123abc')).to.equal(false);
    });

    it('isValidEcl', () => {
      expect(isValidEcl('brn')).to.equal(true);
      expect(isValidEcl('wat')).to.equal(false);
    });

    it('isValidPid', () => {
      expect(isValidPid('000000001')).to.equal(true);
      expect(isValidPid('0123456789')).to.equal(false);
    });
  });
});

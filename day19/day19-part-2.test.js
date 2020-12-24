const { describe, it } = require('mocha');
const { expect } = require('chai');
const { buildRegex, main, parseRules } = require('./day19-part-2');

describe('Day 19 - Part 2', () => {
  describe('parseRules', () => {
    it('returns an object with parsed rules', async () => {
      const rulesText = [
        '0: 4 1 5',
        '1: 2 3 | 3 2',
        '2: 4 4 | 5 5',
        '3: 4 5 | 5 4',
        '4: "a"',
        '5: "b"'
      ].join('\n');

      const result = parseRules(rulesText);

      expect(result).to.deep.equal({
        0: {
          isChar: false,
          ruleIds: [['4', '1', '5']]
        },
        1: {
          isChar: false,
          ruleIds: [
            ['2', '3'],
            ['3', '2']
          ]
        },
        2: {
          isChar: false,
          ruleIds: [
            ['4', '4'],
            ['5', '5']
          ]
        },
        3: {
          isChar: false,
          ruleIds: [
            ['4', '5'],
            ['5', '4']
          ]
        },
        4: {
          isChar: true,
          value: 'a'
        },
        5: {
          isChar: true,
          value: 'b'
        }
      });
    });
  });

  describe('buildRegex', () => {
    it('returns patterns to validate messages', async () => {
      const rules = parseRules(
        [
          '0: 4 1 5',
          '1: 2 3 | 3 2',
          '2: 4 4 | 5 5',
          '3: 4 5 | 5 4',
          '4: "a"',
          '5: "b"'
        ].join('\n')
      );

      expect(buildRegex('5', rules)).to.equal('b');
      expect(buildRegex('4', rules)).to.equal('a');
      expect(buildRegex('3', rules)).to.equal('(ab|ba)');
      expect(buildRegex('2', rules)).to.equal('(aa|bb)');
      expect(buildRegex('1', rules)).to.equal(
        '((aa|bb)(ab|ba)|(ab|ba)(aa|bb))'
      );
      expect(buildRegex('0', rules)).to.equal(
        '(a((aa|bb)(ab|ba)|(ab|ba)(aa|bb))b)'
      );
    });
  });

  describe('main', () => {
    describe('when overrideRules is false', () => {
      it('returns the number of valid messages without overriding rules 8 and 11', async () => {
        const resultA = await main('day19/test-input', false);
        const resultB = await main('day19/test-input-2', false);

        expect(resultA).to.equal(2);
        expect(resultB).to.equal(3);
      });
    });

    describe('when overrideRules is true', () => {
      it('returns the number of valid messages after overriding rules 8 and 11', async () => {
        const resultB = await main('day19/test-input-2');

        expect(resultB).to.equal(12);
      });
    });
  });
});

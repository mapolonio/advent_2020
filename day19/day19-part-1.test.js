const { describe, it } = require('mocha');
const { expect } = require('chai');
const {
  getRuleTree,
  main,
  mergeArrays,
  parseRules,
  reduceRule
} = require('./day19-part-1');

describe('Day 19 - Part 1', () => {
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

  describe('getRuleTree', () => {
    it('returns an array with the order of the dependencies of the rules', async () => {
      const rules = {
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
      };

      const result = getRuleTree(rules);

      expect(result).to.deep.equal(['0', '4', '1', '5', '2', '3']);
    });
  });

  describe('reduceRule', () => {
    it('returns a string representing the reduced version of a rule', async () => {
      const rules = {
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
      };
      const rulesB = parseRules(
        ['0: 1 2', '1: "a"', '2: 1 3 | 3 1', '3: "b"'].join('\n')
      );

      expect(reduceRule('4', rules)).to.deep.equal(['a']);
      expect(reduceRule('5', rules)).to.deep.equal(['b']);
      expect(reduceRule('2', rules)).to.deep.equal(['aa', 'bb']);
      expect(reduceRule('3', rules)).to.deep.equal(['ab', 'ba']);
      expect(reduceRule('1', rules)).to.deep.equal([
        'aaab',
        'aaba',
        'bbab',
        'bbba',
        'abaa',
        'abbb',
        'baaa',
        'babb'
      ]);
      expect(reduceRule('0', rules)).to.deep.equal([
        'aaaabb',
        'aaabab',
        'abbabb',
        'abbbab',
        'aabaab',
        'aabbbb',
        'abaaab',
        'ababbb'
      ]);
      expect(reduceRule('0', rulesB)).to.deep.equal(['aab', 'aba']);
    });
  });

  describe('mergeArrays', () => {
    it('returns a single array with the combination of the values of the arrays', async () => {
      expect(mergeArrays([['a']])).to.deep.equal(['a']);
      expect(mergeArrays([['a'], ['b']])).to.deep.equal(['ab']);
      expect(
        mergeArrays([
          ['a', 'b'],
          ['c', 'd']
        ])
      ).to.deep.equal(['ac', 'ad', 'bc', 'bd']);
      expect(
        mergeArrays([
          ['a', 'b'],
          ['c', 'd'],
          ['e', 'f']
        ])
      ).to.deep.equal(['ace', 'acf', 'ade', 'adf', 'bce', 'bcf', 'bde', 'bdf']);
      expect(
        mergeArrays([
          ['a', 'b'],
          ['c', 'd', 'e']
        ])
      ).to.deep.equal(['ac', 'ad', 'ae', 'bc', 'bd', 'be']);
    });
  });

  describe('main', () => {
    it('returns the number of valid messages after applying the rules', async () => {
      const result = await main('day19/test-input');

      expect(result).to.equal(2);
    });
  });
});

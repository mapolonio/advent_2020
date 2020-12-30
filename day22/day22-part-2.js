const { getInput } = require('../utils');

class Deck {
  constructor(cards) {
    this.cards = cards;
  }

  addToBottom(cards) {
    this.cards.push(...cards);
  }

  take() {
    return this.cards.shift();
  }

  clone(quantity) {
    return this.cards.slice(0, quantity);
  }

  isEmtpy() {
    return this.cards.length === 0;
  }

  get score() {
    let result = 0;

    for (
      let i = this.cards.length - 1, factor = 1;
      i >= 0;
      i -= 1, factor += 1
    ) {
      result += this.cards[i] * factor;
    }

    return result;
  }

  get deckSize() {
    return this.cards.length;
  }
}

const parseInput = (input) => {
  return input.split('\n\n').map(parsePlayer);
};

const parsePlayer = (playerText) => {
  const [, ...deck] = playerText.split('\n');

  return deck.map((n) => parseInt(n, 10));
};

const playGame = ([cardsA, cardsB]) => {
  const deckA = new Deck(cardsA);
  const deckB = new Deck(cardsB);
  const cache = {};

  while (!deckA.isEmtpy() && !deckB.isEmtpy()) {
    const key = getKey(deckA, deckB);

    if (cache[key]) {
      return {
        scoreA: deckA.score,
        scoreB: -1
      };
    }

    cache[key] = true;

    const cardA = deckA.take();
    const cardB = deckB.take();
    let winnerDeck = cardA > cardB ? deckA : deckB;

    if (deckA.deckSize >= cardA && deckB.deckSize >= cardB) {
      const { scoreA, scoreB } = playGame([
        deckA.clone(cardA),
        deckB.clone(cardB)
      ]);

      winnerDeck = scoreA > scoreB ? deckA : deckB;
    }

    const winnerCards = winnerDeck === deckA ? [cardA, cardB] : [cardB, cardA];
    winnerDeck.addToBottom(winnerCards);
  }

  return {
    scoreA: deckA.score,
    scoreB: deckB.score
  };
};

const getKey = (deckA, deckB) => {
  return `${deckA.cards.join(',')}|${deckB.cards.join(',')}`;
};

const main = async (inputPath = 'day22/input') => {
  const cards = await getInput(inputPath, parseInput);
  const { scoreA, scoreB } = playGame(cards);

  return scoreA > scoreB ? scoreA : scoreB;
};

module.exports = { main, parseInput, Deck };

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

  while (!deckA.isEmtpy() && !deckB.isEmtpy()) {
    const cardA = deckA.take();
    const cardB = deckB.take();

    if (cardA > cardB) {
      deckA.addToBottom([cardA, cardB]);
    } else {
      deckB.addToBottom([cardB, cardA]);
    }
  }

  return deckA.isEmtpy() ? deckB.score : deckA.score;
};

const main = async (inputPath = 'day22/input') => {
  const cards = await getInput(inputPath, parseInput);
  const winnerScore = playGame(cards);

  return winnerScore;
};

module.exports = { main, parseInput, Deck };

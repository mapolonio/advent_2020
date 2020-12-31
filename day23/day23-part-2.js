class Cup {
  constructor(label) {
    this.label = label;
  }

  set next(cup) {
    this.nextCup = cup;
  }

  get next() {
    return this.nextCup;
  }
}

class CupGame {
  constructor(cups) {
    this.pickedCups = [];
    this._initCups(cups);
  }

  _initCups(cups) {
    this.cupMap = new Map();
    let lastCup;

    for (let i = 0; i < cups.length; i += 1) {
      const label = cups[i];
      const cup = new Cup(label);

      if (i === 0) {
        this.currentCup = cup;
      }

      if (lastCup) {
        lastCup.next = cup;
      }

      if (this.minCup === undefined || this.minCup.label > label) {
        this.minCup = cup;
      }

      if (this.maxCup === undefined || this.maxCup.label < label) {
        this.maxCup = cup;
      }

      this.cupMap.set(label, cup);
      lastCup = cup;
    }

    lastCup.next = this.currentCup;
  }

  _pickCups() {
    this.pickedCups = [
      this.currentCup.next,
      this.currentCup.next.next,
      this.currentCup.next.next.next
    ];

    this.currentCup.next = this.pickedCups[2].next;
  }

  _selectDestination(currentCup) {
    let selectedLabel = currentCup.label - 1;

    if (selectedLabel < this.minCup.label) {
      selectedLabel = this.maxCup.label;
    }

    const selectedCup = this.cupMap.get(selectedLabel);

    if (this.pickedCups.includes(selectedCup)) {
      return this._selectDestination(selectedCup);
    }

    return selectedCup;
  }

  makeMove() {
    const { currentCup } = this;
    this._pickCups();
    const destinationCup = this._selectDestination(currentCup);
    const tail = destinationCup.next;

    destinationCup.next = this.pickedCups[0];
    this.pickedCups[2].next = tail;
    this.pickedCups = [];

    this.currentCup = this.currentCup.next;
  }

  get finalResult() {
    const cupOne = this.cupMap.get(1);

    return cupOne.next.label * cupOne.next.next.label;
  }

  get cupArray() {
    let { currentCup } = this;
    const result = [currentCup.label];

    while (currentCup.next !== this.currentCup) {
      result.push(currentCup.next.label);
      currentCup = currentCup.next;
    }

    return result;
  }
}

const playGame = (cups, moves) => {
  const game = new CupGame(cups);

  for (let i = 0; i < moves; i += 1) {
    game.makeMove();
  }

  return game;
};

const getMillionCups = (input) => {
  let maxInput;
  const result = [];

  for (const n of input.split('')) {
    const number = parseInt(n, 10);

    if (maxInput === undefined || number > maxInput) {
      maxInput = number;
    }

    result.push(number);
  }

  for (let n = maxInput + 1; n <= 1000000; n += 1) {
    result.push(n);
  }

  return result;
};

const main = (input = '653427918', moves = 10000000) => {
  const cups = getMillionCups(input);
  const finishedGame = playGame(cups, moves);

  return finishedGame.finalResult;
};

module.exports = { CupGame, main };

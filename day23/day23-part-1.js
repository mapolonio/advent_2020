class CupGame {
  constructor(cups) {
    this.cups = cups;
    this.currentIndex = 0;
    this.pickedCups = [];

    this._selectMinAndMax();
  }

  _selectMinAndMax() {
    this.minCup = this.cups[0];
    this.maxCup = this.cups[0];

    for (const cup of this.cups) {
      this.minCup = Math.min(this.minCup, cup);
      this.maxCup = Math.max(this.maxCup, cup);
    }
  }

  _getCup(index) {
    return this.cups[index % this.cups.length];
  }

  _pickCups() {
    const { currentCup } = this;
    this.pickedCups = [];

    for (let i = 1; i <= 3; i += 1) {
      this.pickedCups.push(this._getCup(this.currentIndex + i));
    }

    this.cups = this.cups.filter((cup) => !this.pickedCups.includes(cup));
    this._updateCurrentIndex(currentCup);
    this._selectMinAndMax();
  }

  _updateCurrentIndex(cup) {
    this.currentIndex = this.cups.indexOf(cup);
  }

  _selectDestination(currentCup) {
    let selectedCup = currentCup - 1;

    if (selectedCup < this.minCup) {
      selectedCup = this.maxCup;
    }

    if (!this.cups.includes(selectedCup)) {
      return this._selectDestination(selectedCup);
    }

    return this.cups.indexOf(selectedCup);
  }

  _selectNextCup() {
    this.currentIndex = (this.currentIndex + 1) % this.cups.length;
  }

  makeMove() {
    const { currentCup } = this;
    this._pickCups();
    const destinationCupIndex = this._selectDestination(currentCup);
    const nextCups = [];

    for (let index = 0; index < this.cups.length; index += 1) {
      nextCups.push(this.cups[index]);

      if (index === destinationCupIndex) {
        nextCups.push(...this.pickedCups);
        this.pickedCups = [];
      }
    }

    this.cups = nextCups;
    this._updateCurrentIndex(currentCup);
    this._selectNextCup();
    this._selectMinAndMax();
  }

  get currentCup() {
    return this.cups[this.currentIndex];
  }

  get labeling() {
    const oneIndex = this.cups.indexOf(1);
    let label = '';

    for (let i = oneIndex + 1; i < oneIndex + this.cups.length; i += 1) {
      label += this._getCup(i);
    }

    return label;
  }
}

const playGame = (cups, moves) => {
  const game = new CupGame(cups);

  for (let i = 0; i < moves; i += 1) {
    game.makeMove();
  }

  return game;
};

const parseCups = (input) => input.split('').map((cup) => parseInt(cup, 10));

const main = (input = '653427918', moves = 100) => {
  const cups = parseCups(input);
  const finishedGame = playGame(cups, moves);

  return finishedGame.labeling;
};

module.exports = { CupGame, main };

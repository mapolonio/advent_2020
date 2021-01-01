const { getInput } = require('../utils');

const COLORS = {
  WHITE: 'white',
  BLACK: 'black'
};

const parseInput = (input) => {
  return input.split('\n').map(parseTile);
};

const parseTile = (tileText) => {
  const pattern = /(e|se|sw|w|nw|ne)/g;

  return tileText.match(pattern);
};

const getTileCoord = (directions) => {
  let xCoord = 0;
  let yCoord = 0;

  for (const direction of directions) {
    switch (direction) {
      case 'e':
        xCoord += 1;
        break;
      case 'w':
        xCoord -= 1;
        break;
      case 'ne':
        xCoord += 0.5;
        yCoord += 1;
        break;
      case 'se':
        xCoord += 0.5;
        yCoord -= 1;
        break;
      case 'nw':
        xCoord -= 0.5;
        yCoord += 1;
        break;
      case 'sw':
        xCoord -= 0.5;
        yCoord -= 1;
        break;
      default:
        continue;
    }
  }

  return {
    xCoord,
    yCoord
  };
};

const getTileMap = (tileDirections) => {
  const tileMap = new Map();

  for (const tileDirection of tileDirections) {
    const { xCoord, yCoord } = getTileCoord(tileDirection);
    const key = `${xCoord},${yCoord}`;

    tileMap.set(key, flipColor(tileMap.get(key)));
  }

  return tileMap;
};

const flipColor = (color) => {
  if (!color) {
    return COLORS.BLACK;
  }

  if (color === COLORS.WHITE) {
    return COLORS.BLACK;
  }

  return COLORS.WHITE;
};

const countBlackTiles = (tileMap) => {
  let total = 0;

  for (const [, color] of tileMap) {
    if (color === COLORS.BLACK) {
      total += 1;
    }
  }

  return total;
};

const main = async (inputPath = 'day24/input') => {
  const tileDirections = await getInput(inputPath, parseInput);
  const tileMap = getTileMap(tileDirections);
  const blackTileCount = countBlackTiles(tileMap);

  return blackTileCount;
};

module.exports = { getTileCoord, main, parseInput };

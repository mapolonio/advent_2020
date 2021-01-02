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
    const key = getKey(xCoord, yCoord);

    tileMap.set(key, flipColor(tileMap.get(key)));
  }

  return tileMap;
};

const flipColor = (color = COLORS.WHITE) => {
  return color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
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

const simulateDays = (tileMap, days) => {
  let currentMap = tileMap;

  for (let i = 0; i < days; i += 1) {
    currentMap = advanceOneDay(currentMap);
  }

  return countBlackTiles(currentMap);
};

const advanceOneDay = (tileMap) => {
  const newMap = new Map();
  const keysToCheck = getKeysToCheck(tileMap);

  for (const key of keysToCheck) {
    const [xCoord, yCoord] = keyToCoords(key);
    const blacks = countNeighbors(xCoord, yCoord, tileMap);
    const newColor = getNewColor(tileMap.get(key), blacks);

    newMap.set(key, newColor);
  }

  return newMap;
};

const getKeysToCheck = (tileMap) => {
  const result = new Set();

  for (const [key, color] of tileMap) {
    result.add(key);

    if (color !== COLORS.BLACK) {
      continue;
    }

    const [xCoord, yCoord] = keyToCoords(key);
    getNeighborCoords(xCoord, yCoord).forEach((neighborKey) =>
      result.add(neighborKey)
    );
  }

  return [...result];
};

const getNeighborCoords = (xCoord, yCoord) => {
  return [
    getKey(xCoord + 1, yCoord),
    getKey(xCoord - 1, yCoord),
    getKey(xCoord + 0.5, yCoord + 1),
    getKey(xCoord + 0.5, yCoord - 1),
    getKey(xCoord - 0.5, yCoord + 1),
    getKey(xCoord - 0.5, yCoord - 1)
  ];
};

const getKey = (xCoord, yCoord) => `${xCoord},${yCoord}`;

const keyToCoords = (key) => key.split(',').map((coord) => parseFloat(coord));

const countNeighbors = (xCoord, yCoord, tileMap) => {
  const neighborKeys = getNeighborCoords(xCoord, yCoord);
  let blacks = 0;

  for (const key of neighborKeys) {
    const color = tileMap.get(key);

    if (color === COLORS.BLACK) {
      blacks += 1;
    }
  }

  return blacks;
};

const getNewColor = (color = COLORS.WHITE, blacks) => {
  if (color === COLORS.WHITE) {
    if (blacks === 2) {
      return COLORS.BLACK;
    }
  } else {
    if (blacks === 0 || blacks > 2) {
      return COLORS.WHITE;
    }
  }

  return color;
};

const main = async (inputPath = 'day24/input', days = 100) => {
  const tileDirections = await getInput(inputPath, parseInput);
  const tileMap = getTileMap(tileDirections);
  const blackTileCount = simulateDays(tileMap, days);

  return blackTileCount;
};

module.exports = {
  advanceOneDay,
  countBlackTiles,
  getTileMap,
  main,
  parseInput
};

const { getInput } = require('../utils');

const OPPOSITES = {
  north: 'south',
  south: 'north',
  west: 'east',
  east: 'west'
};

const parseInput = (input) => {
  return input.split('\n\n').map(parseTile);
};

const parseTile = (tileText) => {
  const [idText, ...tileData] = tileText.split('\n');
  const [, id] = idText.match(/^Tile (\d+):$/);

  return {
    id,
    ...parseImage(tileData)
  };
};

const parseImage = (tileData) => {
  let northBorder;
  let southBorder;
  let eastBorder = '';
  let westBorder = '';
  const image = [];

  for (let i = 0; i < tileData.length; i += 1) {
    const row = tileData[i];

    if (i > 0 && i < tileData.length - 1) {
      image.push(row.substring(1, row.length - 1).split(''));
    }

    if (i === 0) {
      northBorder = row;
    }

    if (i === tileData.length - 1) {
      southBorder = row;
    }

    westBorder += row[0];
    eastBorder += row[row.length - 1];
  }

  return {
    northBorder,
    southBorder,
    eastBorder,
    westBorder,
    image
  };
};

const assembleTiles = (tiles, assembledTiles = []) => {
  if (tiles.length === 0) {
    return assembledTiles;
  }

  let matchedIndex;

  for (let i = 0; i < tiles.length; i += 1) {
    const tile = tiles[i];
    const matchedTile = tryTile(tile, assembledTiles);

    if (matchedTile) {
      placeTile(matchedTile, assembledTiles);

      matchedIndex = i;
      break;
    }
  }

  if (matchedIndex === undefined) {
    throw new Error('No match found');
  }

  return assembleTiles(
    [...tiles.slice(0, matchedIndex), ...tiles.slice(matchedIndex + 1)],
    assembledTiles
  );
};

const placeTile = (matchedTile, assembledTiles) => {
  const { tile, neighbor, border } = matchedTile;

  if (!neighbor) {
    return assembledTiles.push({
      ...tile,
      row: 0,
      col: 0
    });
  }

  neighbor[border] = tile.id;

  return assembledTiles.push({
    ...tile,
    [OPPOSITES[border]]: neighbor.id,
    ...getPosition(matchedTile)
  });
};

const getPosition = (matchedTile) => {
  const { neighbor, border } = matchedTile;
  const { col, row } = neighbor;

  switch (border) {
    case 'north':
      return {
        col,
        row: row + 1
      };
    case 'south':
      return {
        col,
        row: row - 1
      };
    case 'east':
      return {
        col: col + 1,
        row
      };
    default:
      return {
        col: col - 1,
        row
      };
  }
};

const tryTile = (tile, assembledTiles) => {
  let currentTile = { ...tile };

  if (assembledTiles.length === 0) {
    return { tile };
  }

  for (const assembledTile of assembledTiles) {
    for (let flips = 0; flips < 2; flips += 1) {
      for (let rotations = 0; rotations < 4; rotations += 1) {
        for (const borderPosition of ['north', 'south', 'east', 'west']) {
          if (assembledTile[borderPosition]) {
            continue;
          }

          if (tryMatch(assembledTile, currentTile, borderPosition)) {
            return {
              tile: currentTile,
              neighbor: assembledTile,
              border: borderPosition
            };
          }
        }

        currentTile = rotateTile(currentTile);
      }

      currentTile = flipTile(currentTile);
    }
  }

  return null;
};

const tryMatch = (tileA, tileB, borderLocation) => {
  let borderA;
  let borderB;

  switch (borderLocation) {
    case 'north':
      borderA = 'northBorder';
      borderB = 'southBorder';
      break;
    case 'east':
      borderA = 'eastBorder';
      borderB = 'westBorder';
      break;
    case 'west':
      borderA = 'westBorder';
      borderB = 'eastBorder';
      break;
    // south
    default:
      borderA = 'southBorder';
      borderB = 'northBorder';
  }

  return tileA[borderA] === tileB[borderB];
};

const rotateTile = (tile) => {
  return {
    ...tile,
    northBorder: reverse(tile.westBorder),
    southBorder: reverse(tile.eastBorder),
    eastBorder: tile.northBorder,
    westBorder: tile.southBorder,
    image: rotateImage(tile.image)
  };
};

const rotateImage = (image) => {
  const result = [];

  for (let r = 0; r < image.length; r += 1) {
    const row = image[r];

    for (let c = 0; c < row.length; c += 1) {
      if (!result[c]) {
        result[c] = [];
      }

      result[c][row.length - 1 - r] = row[c];
    }
  }

  return result;
};

const flipTile = (tile) => {
  return {
    ...tile,
    northBorder: tile.southBorder,
    southBorder: tile.northBorder,
    eastBorder: reverse(tile.eastBorder),
    westBorder: reverse(tile.westBorder),
    image: flipImage(tile.image)
  };
};

const flipImage = (image) => {
  const result = [];

  for (let r = image.length - 1; r >= 0; r -= 1) {
    result.push(image[r]);
  }

  return result;
};

const reverse = (str) => {
  let result = '';

  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }

  return result;
};

const mergeTiles = (tiles) => {
  let maxRow = 0;
  let minCol = 0;
  const tileHeight = tiles[0].image.length;
  const tileWidth = tiles[0].image[0].length;
  const result = [];

  for (const tile of tiles) {
    const { col, row } = tile;

    maxRow = Math.max(maxRow, row);
    minCol = Math.min(minCol, col);
  }

  for (const tile of tiles) {
    const { col, row, image } = tile;
    const normalizedCol = col - minCol;
    const normalizedRow = maxRow - row;

    /* eslint-disable no-mixed-operators */
    for (let imageRow = 0; imageRow < tileHeight; imageRow += 1) {
      const finalRow = tileHeight * normalizedRow + imageRow;

      for (let imageCol = 0; imageCol < tileWidth; imageCol += 1) {
        const finalCol = tileWidth * normalizedCol + imageCol;

        if (!result[finalRow]) {
          result[finalRow] = [];
        }

        result[finalRow][finalCol] = image[imageRow][imageCol];
      }
    }
    /* eslint-enable no-mixed-operators */
  }

  return result;
};

const countMonsters = (image, monster) => {
  let monsters = 0;
  let currentImage = cloneImage(image);
  const imageHeight = image.length;
  const imageWidth = image[0].length;
  const monsterHeight = monster.length;
  const monsterWidth = monster[0].length;

  for (let rotations = 0; rotations < 4; rotations += 1) {
    for (let flips = 0; flips < 2; flips += 1) {
      for (let r = 0; r <= imageHeight - monsterHeight; r += 1) {
        for (let c = 0; c <= imageWidth - monsterWidth; c += 1) {
          if (monsterMatch(currentImage, monster, r, c)) {
            monsters += 1;
          }
        }
      }

      currentImage = flipImage(currentImage);
    }

    currentImage = rotateImage(currentImage);
  }

  return monsters;
};

const monsterMatch = (image, monster, row, col) => {
  const monsterHeight = monster.length;
  const monsterWidth = monster[0].length;

  for (let r = row; r < row + monsterHeight; r += 1) {
    const monsterRow = r - row;

    for (let c = col; c < col + monsterWidth; c += 1) {
      const monsterCol = c - col;

      if (monster[monsterRow][monsterCol] !== '#') {
        continue;
      }

      if (image[r][c] !== '#') {
        return false;
      }
    }
  }

  return true;
};

const cloneImage = (image) => image.map((row) => row.slice(0));

const countSpots = (image) => {
  let sum = 0;

  for (const row of image) {
    for (const pixel of row) {
      if (pixel === '#') {
        sum += 1;
      }
    }
  }

  return sum;
};

const main = async (inputPath = 'day20/input') => {
  const tiles = await getInput(inputPath, parseInput);
  const assembledImage = assembleTiles(tiles);
  const image = mergeTiles(assembledImage);
  const seaMonster = [
    '                  # ',
    '#    ##    ##    ###',
    ' #  #  #  #  #  #   '
  ];
  const monsters = countMonsters(image, seaMonster);
  const spots = countSpots(image);

  // Each monster has 15 # pixels
  // eslint-disable-next-line no-mixed-operators
  return spots - monsters * 15;
};

module.exports = {
  countMonsters,
  flipTile,
  main,
  mergeTiles,
  parseInput,
  rotateTile
};

const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n\n').map(parseTile);
};

const parseTile = (tileText) => {
  const [idText, ...tileData] = tileText.split('\n');
  const [, id] = idText.match(/^Tile (\d+):$/);
  const { northBorder, eastBorder, southBorder, westBorder } = getBorders(
    tileData
  );

  return {
    id,
    northBorder,
    southBorder,
    eastBorder,
    westBorder
  };
};

const getBorders = (tileData) => {
  let northBorder;
  let southBorder;
  let eastBorder = '';
  let westBorder = '';

  for (let i = 0; i < tileData.length; i += 1) {
    const row = tileData[i];

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
    westBorder
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
    [opposite(border)]: neighbor.id,
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

const opposite = (direction) => {
  const opposites = {
    north: 'south',
    south: 'north',
    west: 'east',
    east: 'west'
  };

  return opposites[direction];
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
    westBorder: tile.southBorder
  };
};

const flipTile = (tile) => {
  return {
    ...tile,
    northBorder: tile.southBorder,
    southBorder: tile.northBorder,
    eastBorder: reverse(tile.eastBorder),
    westBorder: reverse(tile.westBorder)
  };
};

const reverse = (str) => {
  let result = '';

  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }

  return result;
};

const getCornerIds = (image) => {
  let leftTop;
  let rightTop;
  let leftBottom;
  let rightBottom;

  for (const tile of image) {
    const { col, row, id } = tile;

    if (!leftTop || (leftTop.col >= col && leftTop.row <= row)) {
      leftTop = {
        col,
        row,
        id
      };
    }

    if (!rightTop || (rightTop.col <= col && rightTop.row <= row)) {
      rightTop = {
        col,
        row,
        id
      };
    }

    if (!leftBottom || (leftBottom.col >= col && leftBottom.row >= row)) {
      leftBottom = {
        col,
        row,
        id
      };
    }

    if (!rightBottom || (rightBottom.col <= col && rightBottom.row >= row)) {
      rightBottom = {
        col,
        row,
        id
      };
    }
  }

  return [leftTop.id, rightTop.id, leftBottom.id, rightBottom.id];
};

const main = async (inputPath = 'day20/input') => {
  const tiles = await getInput(inputPath, parseInput);
  const assembledImage = assembleTiles(tiles);
  const cornerIds = getCornerIds(assembledImage);
  let result = 1;

  for (const cornerId of cornerIds) {
    result *= parseInt(cornerId, 10);
  }

  return result;
};

module.exports = { flipTile, main, parseInput, rotateTile };

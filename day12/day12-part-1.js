const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n').map(parseAction);
};

const parseAction = (actionText) => {
  const pattern = /([RLNSEWF])(\d+)/;
  const [, action, value] = actionText.match(pattern);

  return { action, value: parseInt(value, 10) };
};

const getNextPosition = (ship, action, value) => {
  switch (action) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      return move(ship, action, value);
    case 'F':
      return moveForward(ship, value);
    // L|R
    default:
      return rotate(ship, action, value);
  }
};

const move = (ship, action, value) => {
  const result = { ...ship };

  switch (action) {
    case 'N':
      result.lat += value;
      break;
    case 'S':
      result.lat -= value;
      break;
    case 'E':
      result.lng += value;
      break;
    // W
    default:
      result.lng -= value;
  }

  return result;
};

const moveForward = (ship, value) => {
  switch (ship.direction) {
    case 'N':
    case 'E':
      return move(ship, ship.direction, value);
    // S|W
    default:
      return move(ship, ship.direction, value);
  }
};

const rotate = (ship, action, value) => {
  let currentRotation = ship.direction;
  let targetRotation = value % 360;

  if (action === 'L') {
    targetRotation = 360 - targetRotation;
  }

  const rotationSteps = targetRotation / 90;

  for (let step = 0; step < rotationSteps; step += 1) {
    currentRotation = rotate90(currentRotation);
  }

  return { ...ship, direction: currentRotation };
};

const rotate90 = (direction) => {
  switch (direction) {
    case 'N':
      return 'E';
    case 'E':
      return 'S';
    case 'S':
      return 'W';
    // W
    default:
      return 'N';
  }
};

const processDirectives = (directives, ship) => {
  let currentPosition = { ...ship };

  for (const directive of directives) {
    currentPosition = getNextPosition(
      currentPosition,
      directive.action,
      directive.value
    );
  }

  return currentPosition;
};

const getManhattanDistance = (ship) => {
  return Math.abs(ship.lat) + Math.abs(ship.lng);
};

const main = async (inputPath = 'day12/input') => {
  const directives = await getInput(inputPath, parseInput);
  const finalPosition = processDirectives(directives, {
    direction: 'E',
    lat: 0,
    lng: 0
  });

  return getManhattanDistance(finalPosition);
};

module.exports = { getNextPosition, main, move, parseInput };

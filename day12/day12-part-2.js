const { getInput } = require('../utils');

const parseInput = (input) => {
  return input.split('\n').map(parseAction);
};

const parseAction = (actionText) => {
  const pattern = /([RLNSEWF])(\d+)/;
  const [, action, value] = actionText.match(pattern);

  return { action, value: parseInt(value, 10) };
};

const getNextPosition = (ship, waypoint, action, value) => {
  let newShip = { ...ship };
  let newWaypoint = { ...waypoint };

  switch (action) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      newWaypoint = move(waypoint, action, value);
      break;
    case 'F':
      ({ ship: newShip, waypoint: newWaypoint } = moveToWaypoint(
        ship,
        waypoint,
        value
      ));
      break;
    // L|R
    default:
      newWaypoint = rotate(ship, waypoint, action, value);
  }

  return {
    ship: newShip,
    waypoint: newWaypoint
  };
};

const move = (position, action, value) => {
  const result = { ...position };

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

const moveToWaypoint = (ship, waypoint, value) => {
  const latOffset = waypoint.lat - ship.lat;
  const lngOffset = waypoint.lng - ship.lng;
  let newShip = { ...ship };

  newShip = move(newShip, 'N', latOffset * value);
  newShip = move(newShip, 'E', lngOffset * value);

  return {
    ship: newShip,
    waypoint: {
      lat: newShip.lat + latOffset,
      lng: newShip.lng + lngOffset
    }
  };
};

const rotate = (ship, waypoint, action, value) => {
  const latOffset = waypoint.lat - ship.lat;
  const lngOffset = waypoint.lng - ship.lng;
  let targetRotation = value % 360;

  if (action === 'L') {
    targetRotation = 360 - targetRotation;
  }

  const { lat, lng } = rotateCoords(latOffset, lngOffset, targetRotation);

  return {
    lat: ship.lat + lat,
    lng: ship.lng + lng
  };
};

const rotateCoords = (lat, lng, angle) => {
  const radians = toRadians(angle);

  /* eslint-disable no-mixed-operators */
  return {
    lat: -1 * lng * Math.sin(radians) + lat * Math.cos(radians),
    lng: lng * Math.cos(radians) + lat * Math.sin(radians)
  };
  /* eslint-enable no-mixed-operators */
};

const toRadians = (angle) => (angle * Math.PI) / 180;

const processDirectives = (directives, ship, waypoint) => {
  let currentPosition = { ...ship };
  let currentWaypoint = { ...waypoint };

  for (const directive of directives) {
    ({ ship: currentPosition, waypoint: currentWaypoint } = getNextPosition(
      currentPosition,
      currentWaypoint,
      directive.action,
      directive.value
    ));
  }

  return {
    ship: currentPosition,
    waypoint: currentWaypoint
  };
};

const getManhattanDistance = (ship) => {
  return Math.abs(ship.lat) + Math.abs(ship.lng);
};

const main = async (inputPath = 'day12/input') => {
  const directives = await getInput(inputPath, parseInput);
  const ship = { lat: 0, lng: 0 };
  const waypoint = { lat: 1, lng: 10 };
  const result = processDirectives(directives, ship, waypoint);

  return getManhattanDistance(result.ship);
};

module.exports = { getNextPosition, main };

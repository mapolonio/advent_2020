const { getInput } = require('../utils');

const parseInput = (input) => {
  const [departureTime, busList] = input.split('\n');

  return {
    departureTime: parseInt(departureTime, 10),
    buses: parseBuslist(busList)
  };
};

const parseBuslist = (busList) => {
  return busList.split(',').reduce((result, bus) => {
    if (bus === 'x') {
      return result;
    }

    return [...result, parseInt(bus, 10)];
  }, []);
};

const getClosestMultiple = (target, multiplier) => {
  const remainder = target % multiplier;

  if (remainder === 0) {
    return target;
  }

  return target - remainder + multiplier;
};

const findEarliestBus = (departureTime, buses) => {
  let closestTime;
  let closestBus;

  for (const bus of buses) {
    const closestSchedule = getClosestMultiple(departureTime, bus);

    if (closestTime === undefined || closestSchedule < closestTime) {
      closestTime = closestSchedule;
      closestBus = bus;
    }
  }

  return { bus: closestBus, time: closestTime };
};

const main = async (inputPath = 'day13/input') => {
  const { departureTime, buses } = await getInput(inputPath, parseInput);
  const { bus, time } = findEarliestBus(departureTime, buses);

  return bus * (time - departureTime);
};

module.exports = { getClosestMultiple, main, parseInput };

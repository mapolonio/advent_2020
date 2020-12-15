const { describe, it } = require('mocha');
const { expect } = require('chai');
const { getNextPosition } = require('./day12-part-2');

describe('Day 12 - Part 1', () => {
  describe('getNextPosition', () => {
    it('returns the ship new position and direction after one directive', async () => {
      const ship = { lat: 0, lng: 0 };
      const waypoint = { lat: 1, lng: 10 };

      const resultA = getNextPosition(ship, waypoint, 'F', 10);
      const resultB = getNextPosition(resultA.ship, resultA.waypoint, 'N', 3);
      const resultC = getNextPosition(resultB.ship, resultB.waypoint, 'F', 7);
      const resultD = getNextPosition(resultC.ship, resultC.waypoint, 'R', 90);
      const resultE = getNextPosition(resultD.ship, resultD.waypoint, 'F', 11);

      expect(resultA).to.deep.equal({
        ship: { lat: 10, lng: 100 },
        waypoint: { lat: 11, lng: 110 }
      });
      expect(resultB).to.deep.equal({
        ship: { lat: 10, lng: 100 },
        waypoint: { lat: 14, lng: 110 }
      });
      expect(resultC).to.deep.equal({
        ship: { lat: 38, lng: 170 },
        waypoint: { lat: 42, lng: 180 }
      });
      expect(resultD).to.deep.equal({
        ship: { lat: 38, lng: 170 },
        waypoint: { lat: 28, lng: 174 }
      });
      expect(resultE).to.deep.equal({
        ship: { lat: -72, lng: 214 },
        waypoint: { lat: -82, lng: 218 }
      });
    });
  });
});

class Ship {
  length;
  hitNumber;
  sunk;
  coordinates;
  vertical;
  constructor(
    length = 1,
    vertical = false,
    coordinates = [],
    hitNumber = 0,
    sunk = false
  ) {
    this.length = length;
    this.vertical = vertical;
    this.coordinates = coordinates;
    this.hitNumber = hitNumber;
    this.sunk = sunk;
  }

  hit = function () {
    if (!this.isSunk()) this.hitNumber++;
  };
  getHitNumber = function () {
    return this.hitNumber;
  };
  getLength = function () {
    return this.length;
  };
  isSunk = function () {
    if (this.hitNumber >= this.length) {
      this.sunk = true;
      return true;
    } else return false;
  };
}

export { Ship };

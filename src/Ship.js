class Ship {
  length;
  hitNumber;
  sunk;
  row;
  col;
  vertical;
  constructor(
    length = 1,
    vertical = false,
    row,
    col,
    hitNumber = 0,
    sunk = false
  ) {
    this.length = length;
    this.vertical = vertical;
    this.row = row;
    this.col = col;
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
  getCoords() {
    const coords = [];
    if (this.vertical)
      for (let row = this.row; row < this.row + this.length; i++)
        coords.push([row, this.col]);
    else
      for (let col = this.col; col < this.col + this.length; col++)
        coords.push([this.row, col]);
    return coords;
  }
}

export { Ship };

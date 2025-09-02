class Ship {
  length;
  hitNumber;
  sunk;
  coords;
  vertical;
  constructor(
    length = 1,
    vertical = false,
    head = [],
    coords = [],
    hitNumber = 0,
    sunk = false
  ) {
    this.length = length;
    this.vertical = vertical;
    if (!coords || coords.length === 0) {
      this.head = head;
      this.coords = this.#buildshipCoords(
        this.length,
        this.vertical,
        this.head
      );
    } else {
      this.coords = vertical
        ? coords.sort(this.#compareRows)
        : coords.sort(this.#compareCols);
      this.head = [this.coords[0][0][0]];
    }
    this.hitNumber = hitNumber;
    this.sunk = sunk;
  }

  hit() {
    if (!this.isSunk()) this.hitNumber++;
  }
  getHitNumber() {
    return this.hitNumber;
  }
  getLength() {
    return this.length;
  }
  isSunk() {
    if (this.hitNumber >= this.length) {
      this.sunk = true;
      return true;
    } else return false;
  }
  getOrientation() {
    return this.vertical;
  }
  getCoords() {
    return this.coords;
  }
  setCoords(coords, vertical) {
    coords = vertical
      ? coords.sort(this.#compareRows)
      : coords.sort(this.#compareCols);
    if (this.#verifyCoords(coords, vertical)) {
      coords.forEach((c) => this.coords.push(c));
      return true;
    }
    return false;
  }
  // setCoords() helper methods begin.
  #compareRows(a, b) {
    if (a[0] === b[0]) return 0;
    return a[0] < b[0] ? -1 : 1;
  }
  #compareCols(a, b) {
    if (a[1] === b[1]) return 0;
    return a[1] < b[1] ? -1 : 1;
  }
  //check if coords are sequential (ships are lines with no gaps)
  #verifyCoords(coords, vertical) {
    if (!coords) return false;
    // vertical
    if (vertical) {
      let colConst = coords[0][1]; // first coord's col
      if (
        coords.every((coord) => coord[1] === colConst) && // all cols are the same
        coords.every(
          (
            coord,
            index // all rows are sequential
          ) =>
            index === coords.length - 1 ||
            coord[0] - coords[index + 1][0] === -1
        )
      )
        return true;
    }
    // horizontal
    else {
      let rowConst = coords[0][0]; // first coord's row
      if (
        coords.every((coord) => coord[0] === rowConst) && // all rows are the same
        coords.every(
          (
            coord,
            index // all cols are sequential
          ) =>
            index === coords.length - 1 ||
            coord[1] - coords[index + 1][1] === -1
        )
      )
        return true;
    }
    return false;
  }
  // setCoords() helper methods end.
  #buildshipCoords(length, vertical, head = []) {
    if (!head || head.length === 0) return;
    const coords = [];
    for (
      let i = vertical ? head[0] : head[1];
      i < (vertical ? head[0] : head[1]) + length;
      i++
    )
      coords.push(vertical ? [i, head[1]] : [head[0], i]);
    return coords;
  }
  getOrientation() {
    return this.vertical;
  }
  getCoords() {
    return this.coords;
  }
  setCoords(coords, vertical) {
    coords = vertical
      ? coords.sort(this.#compareRows)
      : coords.sort(this.#compareCols);
    if (this.#verifyCoords(coords, vertical)) {
      coords.forEach((c) => this.coords.push(c));
      return true;
    }
    return false;
  }
  // setCoords() helper methods begin.
  #compareRows(a, b) {
    if (a[0] === b[0]) return 0;
    return a[0] < b[0] ? -1 : 1;
  }
  #compareCols(a, b) {
    if (a[1] === b[1]) return 0;
    return a[1] < b[1] ? -1 : 1;
  }
  //check if coords are sequential (ships are lines with no gaps)
  #verifyCoords(coords, vertical) {
    if (!coords) return false;
    // vertical
    if (vertical) {
      let colConst = coords[0][1]; // first coord's col
      if (
        coords.every((coord) => coord[1] === colConst) && // all cols are the same
        coords.every(
          (
            coord,
            index // all rows are sequential
          ) =>
            index === coords.length - 1 ||
            coord[0] - coords[index + 1][0] === -1
        )
      )
        return true;
    }
    // horizontal
    else {
      let rowConst = coords[0][0]; // first coord's row
      if (
        coords.every((coord) => coord[0] === rowConst) && // all rows are the same
        coords.every(
          (
            coord,
            index // all cols are sequential
          ) =>
            index === coords.length - 1 ||
            coord[1] - coords[index + 1][1] === -1
        )
      )
        return true;
    }
    return false;
  }
  // setCoords() helper methods end.
}

export { Ship };

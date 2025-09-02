import { Ship } from "./Ship.js";

class Gameboard {
  board;
  ships;
  attacks;
  constructor([rows = 10, cols = 10], ships = [], attacks = []) {
    this.buildGameboard(rows, cols);
    this.ships = ships;
  }
  buildGameboard(rows, cols) {
    if (
      rows <= 0 ||
      cols <= 0 ||
      !Number.isInteger(rows) ||
      !Number.isInteger(cols)
    )
      throw new Error("Rows & Columns must be positive integers!");
    this.board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "~")
    );
  }

  placeShip(ship, headCoords = [], length = 1, vertical = false) {
    if (!ship && (!headCoords || headCoords.length === 0))
      throw new Error("No ship or ship coordinates were provided!");
    if (!ship) {
      const shipCoords = this.#buildShipCoords(headCoords, length, vertical);
      if (!shipCoords)
        throw new Error("Invalid coordinates for ship placement!");
      const ship = new Ship(length, vertical, shipCoords, headCoords);
      this.ships.push(ship);
    } else {
      if (!this.#noOtherShipNearby(ship))
        throw new Error(`There's another ship nearby!`);
      if (ship.coords.some((coord) => !this.#validCoords(coord)))
        throw new Error(`"Ship coordinates are invalid!`);

      this.ships.push(ship);
    }
  }

  #getCoordsAroundTheShip(ship) {
    const vertical = ship.getOrientation; // vertical = true, horizontal = false;
    const coords = ship.getCoords();
    if (!coords || coords.length === 0) return [];
    const coordsAround = [];
    const rows = coords.map((coord) => coord[0]);
    const cols = coords.map((coord) => coord[1]);
    const minRow = Math.min(...rows) - 1; // Expand box by 1
    const maxRow = Math.max(...rows) + 1; // Expand box by 1
    const minCol = Math.min(...cols) - 1; // Expand box by 1
    const maxCol = Math.max(...cols) + 1; // Expand box by 1

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        const newCoord = [row, col];
        // check if the coord is valid & is not part of the ship itself
        if (
          this.#validCoords(newCoord) &&
          !coords.some(
            (shipCoord) => shipCoord[0] === row && shipCoord[1] === col
          )
        )
          coordsAround.push(newCoord);
      }
    }
    return coordsAround;
  }
  // checks if specific coordinate is in bounds of the board
  #validCoords([row, col]) {
    if (
      !Number.isInteger(row) ||
      !Number.isInteger(col) ||
      row < 0 ||
      col < 0 ||
      row >= this.board.length ||
      col >= this.board[0].length
    )
      return false;
    return true;
  }

  #noOtherShipNearby(ship) {
    if (!ship)
      throw new Error("No ship was provided to check for ships nearby!");
    const coordsToCheck = this.#getCoordsAroundTheShip(ship);
    const allShipsCoords = [];
    this.ships.forEach((ship) => allShipsCoords.push(...ship.coords));
    const shipFoundNearby = coordsToCheck.some((checkCoord) =>
      this.ships.some((existingShip) =>
        existingShip.coords.some(
          (existingCoord) =>
            existingCoord[0] === checkCoord[0] &&
            existingCoord[1] === checkCoord[1]
        )
      )
    );
    return !shipFoundNearby;
  }

  #buildShipCoords(head = [], length = 1, vertical = false) {
    if (!head || head.length === 0 || length <= 0 || !this.#validCoords(head))
      return null;
    const coords = [];
    if (vertical) {
      // stay inbound
      if (head[0] + length <= this.board.length)
        for (let i = head[0]; i < head[0] + length; i++)
          coords.push([i, head[1]]);
    }
    // horizontal
    else {
      // stay inbound
      if (head[1] + length <= this.board[0].length)
        for (let i = head[1]; i < head[1] + length; i++)
          coords.push([head[0], i]);
    }
    return coords;
  }

  // prints the ships too, doesn't modify the original board(no ships displayed there)
  stringifyTheBoard() {
    const boardCopy = this.board.map((row) => [...row]);
    this.ships.forEach((ship) =>
      ship.coords.forEach((coord) => (boardCopy[coord[0]][coord[1]] = "#"))
    );
    let s = "";
    for (let row = 0; row < boardCopy.length; row++) {
      for (let col = 0; col < boardCopy[row].length; col++) {
        s = s.concat(boardCopy[row][col]);
      }
      s = s.concat("\n");
    }
    return s;
  }
}

export default Gameboard;

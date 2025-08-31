import { Ship } from "./Ship2.js";
const cell = "~"; // empty cell / water
const miss = "•"; // missed shot
const hit = "X"; // hit shot
const ship = "#"; // are not supposed to show it to userm for testing purposes only!
// enum
const Boardstate = Object.freeze({
  empty: "~",
  miss: "•",
  hit: "X",
  ship: "#", // temporal, for testing purposes
});
class Gameboard {
  board;
  ships;
  attacks;
  constructor([rows = 10, cols = 10], ships = [], attacks = []) {
    this.buildGameboard(rows, cols);
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
      Array.from({ length: cols }, () => Boardstate.empty)
    );
  }

  placeShip(headCoords = [], length = 1, vertical = false) {
    if (!headCoords || headCoords.length === 0) return false;
    const shipCoords = this.buildShipCoords(headCoords, length, vertical);
    if (!shipCoords) throw new Error("Invalid coordinates for ship placement!");
    const ship = new Ship(length, vertical, shipCoords, headCoords);
    this.ships.push(ship);
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
          this.validCoords(newCoord) &&
          !coords.some(
            (shipCoord) => shipCoord[0] === row && shipCoord[1] === col
          )
        )
          coordsAround.push(newCoord);
      }
    }
    return coordsAround;
  }
  coordsBelongToTheShip(ship, [row, col]) {
    if (ship.vertical) {
      if (ship.col !== col || row < ship.row || row >= ship.row + ship.length)
        return false;
    }
    // if horizontal
    else {
      if (ship.row !== row || col < ship.col || col >= ship.col + ship.length)
        return false;
    }
    return true;
  }
  nearbyCoords([row, col]) {
    const coords = [
      [row, col - 1], // left
      [row, col + 1], // right
      [row - 1, col], // up
      [row + 1, col], // down
      [row - 1, col - 1], // left up
      [row - 1, col + 1], // right up
      [row + 1, col - 1], // left down
      [row + 1, col + 1], // right down
    ];
    const validCoords = coords.filter((coord) => this.validCoords(coord));
    return validCoords;
  }
  // checks if specific coordinate is in bounds of the board
  validCoords([row, col]) {
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

  buildShipCoords(head = [], length = 1, vertical = false) {
    if (!head || head.length === 0 || length <= 0 || !this.validCoords(head))
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

  stringifyTheBoard() {
    const boardCopy = JSON.parse(JSON.stringify(this.board));
    this.ships.forEach((ship) =>
      ship.coords.forEach((coord) => (boardCopy[coord[0]][coord[1]] = "#"))
    );
    let s = "";
    for (let row = 0; row < this.boardCopy.length; row++) {
      for (let col = 0; col < this.boardCopy[row].length; col++) {
        s = s.concat(this.boardCopy[row][col]);
      }
      s = s.concat("\n");
    }
    return s;
  }
}

export default Gameboard;

import { Ship } from "./Ship";
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
  #attacks;
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

  placeAShip(ship, [row, col]) {
    if (
      !this.#verifyCorrectShipPlacement(ship, [row, col]) &&
      !this.#noOtherShipsNearby(ship)
    )
      return;
    if (!ship.vertical)
      for (let i = col; i < col + ship.length; i++)
        this.board[row][i] = Boardstate.ship;
    else
      for (let i = row; i < row + ship.length; i++)
        this.board[i][col] = Boardstate.ship;
  }

  #verifyCorrectShipPlacement(ship, [row, col]) {
    if (
      !this.#validCoords([row, col]) ||
      row + (!ship.vertical ? ship.length : 0) >= this.board.length ||
      col + (ship.vertical ? ship.length : 0) >= this.board[0].length
    ) {
      throw new Error("Ship coordinates must be in range of the board!!");
      return false;
    }
    if (!this.#noOtherShipsNearby(ship)) {
      throw new Error("Ship must be at least 1 cell away from any other ship!");
      return false;
    }
    return true;
  }

  #noOtherShipsNearby(ship) {
    let shipFoundNearby = false;
    const shipCoords = ship.getCoords();
    shipCoords.forEach((coords) => {
      const nearbyCoords = this.#nearbyCoords(coords);
      nearbyCoords.forEach((nearCoords) => {
        // might add new condition for hit/sunk ships
        if (
          this.board[nearCoords[0]][nearCoords[1]] !== Boardstate.empty &&
          !this.#coordsBelongToTheShip(ship, nearCoords) // dont really need to check this
          // since we did not place the ship yet in placeAShip() method
        )
          shipFoundNearby = true;
      });
    });
    return !shipFoundNearby;
  }

  #coordsBelongToTheShip(ship, [row, col]) {
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
  #nearbyCoords([row, col]) {
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
    const validCoords = coords.filter((coord) => this.#validCoords(coord));
    return validCoords;
  }

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

  stringifyTheBoard() {
    let s = "";
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        s = s.concat(this.board[row][col]);
      }
      s = s.concat("\n");
    }
    return s;
  }
}

export default Gameboard;

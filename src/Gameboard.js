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
      !Number.isInteger(row) ||
      !Number.isInteger(col) ||
      row <= 0 ||
      col <= 0 ||
      row + (!ship.vertical ? ship.length : 0) >= this.board.length ||
      col + (ship.vertical ? ship.length : 0) >= this.board[0].length
    )
      throw new Error("Ship coordinates must be in range of the board!!");
    if (ship.vertical)
      for (let i = col; i < col + ship.length; i++)
        this.board[row][i] = Boardstate.ship;
    else
      for (let i = row; i < row + ship.length; i++)
        this.board[i][col] = Boardstate.ship;
  }
}

export default Gameboard;

import Gameboard from "./Gameboard";
import { Ship } from "./Ship";

describe("b Class Constructor", () => {
  describe("2D Array Creation", () => {
    test("should create a 2D array with correct dimensions", () => {
      const b = new Gameboard([3, 4]);
      // console.table(b.board);
      // console.log("The board:");
      // console.log(b.stringifyTheBoard());
      expect(b.board).toHaveLength(3);
      b.board.forEach((row) => {
        expect(row).toHaveLength(4);
      });
    });

    test("should initialize all elements with default value (~)", () => {
      const b = new Gameboard([2, 3]);

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          expect(b.board[i][j]).toBe("~");
        }
      }
    });

    test("should throw error for zero rows", () => {
      expect(() => new Gameboard([0, 5])).toThrow(
        "Rows & Columns must be positive integers!"
      );
    });

    test("placing a horizontal ship of length 3 to [1, 3] coordinates", () => {
      const b = new Gameboard([10, 10]);
      const ship = new Ship(3, false, [1, 3]);
      b.placeAShip(ship, [1, 3]);
      console.log("The board:");
      console.log(b.stringifyTheBoard());
      for (let row = 0; row < b.board.length; row++) {
        for (let col = 0; col < b.board[row].length; col++) {
          if (row >= 1 && row <= 1 && col >= 3 && col <= 5) {
            console.log(
              `row: ${row}, col: ${col}, board[row, col]: ${b.board[row][col]}`
            );
            expect(b.board[row][col]).toBe("#");
          } else expect(b.board[row][col]).toBe("~");
        }
      }
    });

    test("placing 2 ships nearby [1,3](L: 3, Horizontal) & [2,7](L:1)", () => {
      const b = new Gameboard([10, 10]);
      const ship1 = new Ship(3, false, [1, 3]);
      const ship2 = new Ship(1, false, [2, 7]);
      b.placeAShip(ship1, [1, 3]);
      console.log("The board after 1st ship placement:");
      console.log(b.stringifyTheBoard());
      b.placeAShip(ship2, [2, 7]);
      console.log("The board after 2nd ship placement:");
      console.log(b.stringifyTheBoard());
    });
  });
});

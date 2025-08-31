import Gameboard from "./Gameboard";
import { Ship } from "./Ship";

describe("b Class Constructor", () => {
  describe("2D Array Creation", () => {
    test("should create a 2D array with correct dimensions", () => {
      const b = new Gameboard([3, 4]);
      console.table(b.board);

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
      for (let row = 0; row < b.board.length; row++) {
        for (let col = 0; col < b.board[row].length; col++) {
          if (row >= 1 && row <= 3 && col >= 3 && col <= 5) {
            expect(b.board[row][col]).toBe("#");
          } else expect(b.board[row][col]).toBe("~");
        }
      }
    });
  });
});

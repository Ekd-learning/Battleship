import Gameboard from "./Gameboard2";
import { Ship } from "./Ship2";

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
      const b = new Gameboard([10, 9]);
      const ship = new Ship(3, false, [1, 3]);
      console.log("ship coords:", ship.coords);
      b.placeShip(ship, ship.head, ship.length, ship.vertical);
      console.log(`The board:\n${b.stringifyTheBoard()}`);
    });

    test("placing 2 ships nearby [1,3](L: 3, H) & [0,6](L:3, V)", () => {
      const b = new Gameboard([10, 10]);
      const ship1 = new Ship(3, false, [1, 3]);
      const ship2 = new Ship(3, false, [2, 6]);
      b.placeShip(ship1, [1, 3]);
      expect(() => b.placeShip(ship2, [1, 3])).toThrow(
        `There's another ship nearby!`
      );
    });
  });
});

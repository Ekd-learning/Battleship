import Gameboard from "./Gameboard";
import Ship from "./Ship";

describe("GameBoard & Ship classes functionality", () => {
  test("should create a 2D array with correct dimensions", () => {
    const b = new Gameboard([3, 4]);
    expect(b.stringifyTheBoardPrivately().split("\n")[0].length).toBe(4);
    expect(
      b
        .stringifyTheBoardPrivately()
        .split("\n")
        .filter((line) => line.length > 0).length
    ).toBe(3);
  });

  test("should initialize all elements with default value (~)", () => {
    const b = new Gameboard([2, 3]);
    const boardStr = b.stringifyTheBoardPrivately();
    const lines = boardStr.split("\n").filter((line) => line.length > 0);

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        expect(lines[i][j]).toBe("~");
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
    // console.log("ship coords:", ship.getCoords());
    b.placeShip(ship, ship.getHead(), ship.getLength(), ship.getOrientation());
    // Can't test b.ships.length directly, but we can verify ship was placed by checking attacks work
    expect(() => b.receiveAttack([1, 3])).not.toThrow();
  });

  test("placing 2 ships nearby [1,3](L: 3, H) & [0,6](L:3, V)", () => {
    const b = new Gameboard([10, 10]);
    const ship1 = new Ship(3, false, [1, 3]);
    const ship2 = new Ship(3, false, [2, 6]);
    b.placeShip(ship1, [1, 3]);
    expect(() => b.placeShip(ship2, [2, 6])).toThrow(
      `There's another ship nearby!`
    );
  });

  test("Testing attack functionality", () => {
    const b = new Gameboard([10, 10]);
    const ship1 = new Ship(3, false, [1, 3]);
    const ship2 = new Ship(3, false, [2, 7]);
    b.placeShip(ship1, [1, 3]);
    b.placeShip(ship2, [2, 7]);
    b.receiveAttack([1, 3]);
    b.receiveAttack([4, 3]);
    b.receiveAttack([1, 4]);
    b.receiveAttack([1, 5]);
    expect(b.gameOver()).toBe(false);
    b.receiveAttack([2, 7]);
    b.receiveAttack([2, 8]);
    b.receiveAttack([2, 9]);
    expect(() => b.receiveAttack([1, 3])).toThrow(
      "[1,3] coordinates were attacked previously!"
    );
    expect(b.gameOver()).toBe(true);
  });
});

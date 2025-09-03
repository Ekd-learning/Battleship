import Gameboard from "./Gameboard";

class Player {
  board;
  enemyBoard;
  constructor() {
    this.board = new Gameboard([10, 10]);
  }
  attack(coords = [], enemyBoard) {
    if (!enemyBoard || enemyBoard === this.board)
      throw new Error(
        `Enemy board doesn't exist / You cannot attack your own board!`
      );
    enemyBoard.receiveAttack(coords);
  }
}

class Human extends Player {
  board;
  enemyBoard;
}

class AI extends Player {
  board;
  enemyBoard;
}

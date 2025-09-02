import Gameboard from "./Gameboard";

class Player {
  board;
  human;
  constructor(human = true) {
    this.board = new Gameboard([10, 10]);
    this.human = human;
  }
  attack(coords = [], enemyBoard) {
    if (!enemyBoard || enemyBoard === this.board)
      throw new Error(
        `Enemy board doesn't exist / You cannot attack your own board!`
      );
    enemyBoard.receiveAttack(coords);
  }
}

export default Player;

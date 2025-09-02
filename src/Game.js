import Player from "./Player";

class Game {
  player1;
  player1Score;
  player2;
  player2Score;
  constructor(PvP = false) {
    this.player1 = new Player();
    this.player2 = new Player(PvP);
  }
}

export default Game;

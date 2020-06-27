import Controller from "@ember/controller";
import { action, set } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import {
  createGrid,
  isWinner,
  stillHasSpaces,
  getCurrentMarker,
  getCurrentName,
  selectFirstPlayer,
} from "../utils/tictactoe";

export default class PlaygameController extends Controller {
  constructor() {
    super(...arguments);
    this.userView = "playerNames"; //game starts with asking for player names
  }

  @tracked userView;
  @tracked currentMarker;
  @tracked currentName;
  @tracked playerA;
  @tracked playerB;
  @tracked draw;
  @tracked winner;

  setGrid(size) {
    this.set("model.grid", createGrid(size));
  }

  addWinToPlayer(players, name) {
    players.find((player) => player.name === name);
  }

  @action
  inputPlayerA(e) {
    this.playerA = e.target.value;
  }

  @action
  inputPlayerB(e) {
    this.playerB = e.target.value;
  }

  @action
  newGame(e) {
    e.preventDefault();
    this.userView = "playingGame";
    this.winner = null;
    this.draw = null;
    this.currentMarker = "x"; // first move is x
    set(this.model.players[0], "name", this.playerA);
    set(this.model.players[1], "name", this.playerB);

    const firstPlayer = selectFirstPlayer();
    if (firstPlayer === "x") {
      set(this.model.players[0], "marker", "x");
      set(this.model.players[1], "marker", "o");
      this.currentName = this.playerA;
    } else {
      set(this.model.players[1], "marker", "x");
      set(this.model.players[0], "marker", "o");
      this.currentName = this.playerB;
    }
    this.setGrid(3);
  }

  @action
  newPlayers() {
    set(this.model.players[0], "wins", 0);
    set(this.model.players[1], "wins", 0);
    this.userView = "playerNames";
  }

  @action
  makeMove(position) {
    set(
      this.model.grid[position[0]][position[1]],
      "marker",
      this.currentMarker
    );
    if (isWinner(this.model.grid)) {
      this.winner = this.currentName;
      const WIN_INCREMENT = 1;
      if (this.model.players[0].name === this.winner) {
        set(
          this.model.players[0],
          "wins",
          this.model.players[0].wins + WIN_INCREMENT
        );
      } else if (this.model.players[1].name === this.winner) {
        set(
          this.model.players[1],
          "wins",
          this.model.players[1].wins + WIN_INCREMENT
        );
      }
      this.userView = "endGame";
    } else if (!stillHasSpaces(this.model.grid)) {
      this.draw = true;
      this.userView = "endGame";
    } else {
      this.currentMarker = getCurrentMarker(this.currentMarker);
      this.currentName = getCurrentName(
        this.currentName,
        this.playerA,
        this.playerB
      );
    }
  }
}

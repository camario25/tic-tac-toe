import Controller from "@ember/controller";
import { action, set } from "@ember/object";
import { tracked } from "@glimmer/tracking";

function mapArray(size, counter) {
  const tempArr = [];
  for (let i = 0; i < size; i++) {
    tempArr[i] = { marker: "", position: [counter, i] }; //the coordinates to access this position in the grid
  }
  return tempArr;
}

function createGrid(size) {
  const grid = [];
  let c = 0;
  for (let j = 0; j < size; j++, c++) {
    grid[j] = mapArray(size, c);
  }
  return grid;
}

//Dertirmine Winner * only for three in a row for now

function isWinner(grid) {
  if (
    grid[0][0].marker !== "" &&
    grid[0][0].marker === grid[0][1].marker &&
    grid[0][1].marker === grid[0][2].marker
  ) {
    return true;
  } else if (
    grid[1][0].marker !== "" &&
    grid[1][0].marker === grid[1][1].marker &&
    grid[1][1].marker === grid[1][2].marker
  ) {
    return true;
  } else if (
    grid[2][0].marker !== "" &&
    grid[2][0].marker === grid[2][1].marker &&
    grid[2][1].marker === grid[2][2].marker
  ) {
    return true;
  } else if (
    grid[0][0].marker !== "" &&
    grid[0][0].marker === grid[1][0].marker &&
    grid[1][0].marker === grid[2][0].marker
  ) {
    return true;
  } else if (
    grid[0][1].marker !== "" &&
    grid[0][1].marker === grid[1][1].marker &&
    grid[1][1].marker === grid[2][1].marker
  ) {
    return true;
  } else if (
    grid[0][2].marker !== "" &&
    grid[0][2].marker === grid[1][2].marker &&
    grid[1][2].marker === grid[2][2].marker
  ) {
    return true;
  } else if (
    grid[0][0].marker !== "" &&
    grid[0][0].marker === grid[1][1].marker &&
    grid[1][1].marker === grid[2][2].marker
  ) {
    return true;
  } else if (
    grid[0][2].marker !== "" &&
    grid[0][2].marker === grid[1][1].marker &&
    grid[1][1].marker === grid[2][0].marker
  ) {
    return true;
  } else {
    return false;
  }
}

//Check if board still has spaces
function stillHasSpaces(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].marker === "") {
        return true;
      }
    }
  }
  return false;
}

//Taking Turns, changes currentMarker from x to o or vice verca

function getCurrentMarker(marker) {
  if (marker === "x") {
    return "o";
  } else if (marker === "o") {
    return "x";
  }
}

function getCurrentName(currentName, playerA, playerB) {
  if (playerA === currentName) {
    return playerB;
  } else if (playerB === currentName) {
    return playerA;
  }
}

function selectFirstPlayer() {
  if (Math.random() < 0.5) {
    return "x";
  } else {
    return "o";
  }
}

export default class PlaygameController extends Controller {
  constructor() {
    super(...arguments);
    this.userView = "playerNames";
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
      if (this.model.players[0].name === this.winner) {
        set(this.model.players[0], "wins", this.model.players[0].wins + 1);
      } else if (this.model.players[1].name === this.winner) {
        set(this.model.players[1], "wins", this.model.players[1].wins + 1);
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

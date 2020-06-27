import Controller from "@ember/controller";
import { action, set } from "@ember/object";
import { tracked } from "@glimmer/tracking";

/*This function returns an array that represents a row, eventually used in the grid
@param {Number} size The length of one row in the grid, for 3x3 grid, size is 3
@param {Number} counter This number represents the eventual position of the row in the grid, it increments at a different rate than the loop hence why is used later in createGrid(size);
@return {Array} The array of objects representing "squares" in a row.  Each array is a row in the grid.
*/
function createRow(size, counter) {
  return [...new Array(size)].map((el, i) => {
    return { marker: "", position: [counter, i] };
  });
}

/*This function creates a grid from rows made by createRow(size, counter);
@param {Number} size The height of the grid, or how many rows in the grid.  For example a 3x3 grid, size would be 3
@return {Array} Returns a nested Array with however many arrays inside as the number size
*/

function createGrid(size) {
  let c = -1;
  return [...new Array(size)].map(() => {
    c++;
    return createRow(size, c);
  });
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
  return grid
    .map((row) => row)
    .some((row) => {
      return row.some((square) => square.marker === "");
    });
}

//Taking Turns, changes currentMarker from x to o or vice verca

function getCurrentMarker(marker) {
  return marker === "x" ? "o" : "x";
}

function getCurrentName(currentName, playerA, playerB) {
  return currentName === playerA ? playerB : playerA;
}

function selectFirstPlayer() {
  return Math.random() < 0.5 ? "x" : "o";
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

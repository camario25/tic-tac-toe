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

function currentPlayer(marker) {
  if (marker === "x") {
    return "o";
  } else if (marker === "o") {
    return "x";
  }
}

//End Game

function endGame(result) {
  declareWinner(result); //display winner
}

//simple alerts for now to show winner
function declareWinner(result) {
  if (result === "draw") {
    alert(`The result is a ${result}`);
  } else {
    alert(`The result is ${result} won!`);
  }
}

function resetBoard(size) {
  return createGrid(size);
}

export default class PlaygameController extends Controller {
  constructor() {
    super(...arguments);
  }

  currentMarker = "x"; //player 1 starts as 'x', we can offer ability to change to 'o' in  future

  @tracked result;

  @action
  setGrid() {
    this.set("model.grid", createGrid(3));
  }
  @action
  makeMove(marker, position, e) {
    // console.log(marker, position, e);
    // this.model.grid.forEach((el) => console.log(el));
    set(
      this.model.grid[position[0]][position[1]],
      "marker",
      this.currentMarker
    );
    if (isWinner(this.model.grid)) {
      this.result = `Winner is ${this.currentMarker}!`;
      console.log(this.result);
    } else if (!stillHasSpaces(this.model.grid)) {
      this.result = "Result is a Draw";
      console.log(this.result);
    } else {
      this.currentMarker = currentPlayer(this.currentMarker);
    }
  }
}

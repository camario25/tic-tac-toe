import Controller from "@ember/controller";
import { action } from "@ember/object";

// initialize the grid function
function createGrid(size) {
  const grid = [];
  const tempArr = [];
  for (let i = 0; i < size; i++) {
    tempArr[i] = { marker: "x" };
    for (let j = 0; j < size; j++) {
      grid[i] = tempArr;
    }
  }
  return grid;
}
// const startingGrid = createGrid(3);
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
      } else {
        return false;
      }
    }
  }
}

//Placing marker in the grid

function placeMarker(grid, coordinates, marker) {
  grid[coordinates[0]][coordinates[1]].marker = marker;
}

//Taking Turns, changes currentMarker from x to o or vice verca

function currentPlayer(marker) {
  if (marker === "x") {
    return "o";
  } else if (marker === "o") {
    return "x";
  }
}

//Check if input is valid

//add changes to grid in model

//End Game

function endGame(result) {
  declareWinner(result); //display winner
  resetBoard();
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

  @action
  setGrid() {
    console.log("pushed");
    this.set("model.grid", createGrid(3));
  }
}

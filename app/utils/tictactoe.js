/*Returns an array that represents a row, eventually used in the grid
@param {Number} size The length of one row in the grid, for 3x3 grid, size is 3
@param {Number} counter This number represents the eventual position of the row in the grid, it increments at a different rate than the loop hence why is used later in createGrid(size);
@return {Array} The array of objects representing "squares" in a row.  Each array is a row in the grid.
*/
function createRow(size, counter) {
  return [...new Array(size)].map((el, i) => {
    return { marker: "", position: [counter, i] };
  });
}

/*Creates a grid from rows made by createRow(size, counter);
@param {Number} size The height of the grid, or how many rows in the grid.  For example a 3x3 grid, size would be 3
@return {Array} Returns a nested Array with however many arrays inside as the number size
*/

function createGrid(size) {
  let counter = -1;
  return [...new Array(size)].map(() => {
    counter++;
    return createRow(size, counter);
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
  const FIFTY_PERCENT_CHANCE = 0.5;
  return Math.random() < FIFTY_PERCENT_CHANCE ? "x" : "o";
}

export {
  createGrid,
  isWinner,
  stillHasSpaces,
  getCurrentMarker,
  getCurrentName,
  selectFirstPlayer,
};

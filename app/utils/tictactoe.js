/**
 * The purpose of this id is for screen readers to be able to read the square to
 * blind people using aria-labels My game logic currently uses the position
 * attribute (an array of two integers) to locate and mutate the value of the
 * marker attribute from "" to "x" or "o"
 */
let squareId = 1;

/**
 * Returns an array that represents a row, eventually used in the grid
 * @param {Number} size The length of one row in the grid, for 3x3 grid, size is
 * 3
 * @param {Number} counter This number represents the eventual position of the
 * row in the grid, it increments at a different rate than the loop hence why is
 * used later in createGrid(size);
 * @returns {Array.<Object>} The array of objects representing "squares" in a
 * row.  Each array is a row in the grid.
 */
function createRow(size, counter) {
  return [...new Array(size)].map((el, i) => {
    return { id: squareId++, marker: "", position: [counter, i] };
  });
}

/**
 * Creates a grid from rows made by createRow(size, counter);
 * @param {Number} size The height of the grid, or how many rows in the grid.
 * For example a 3x3 grid, size would be 3
 * @returns {Array.<Array.<Object>>} Returns a nested Array with however many
 * arrays inside as the number size. The quantity of objects inside each array
 * also matches size.
 */
function createGrid(size) {
  let counter = -1;
  return [...new Array(size)].map(() => {
    counter++;
    return createRow(size, counter);
  });
}

/**
 * Dertirmines if there's a  Winner by checking if object value marker is not
 * empty and equal to "x" or "o" 3 times in a row in any direction.  Currently
 * only checks a 3x3 grid
 * @param {Array.<Array.<Object>>} grid Two dimensional array with objects
 * representing a tictactoe square
 * @returns {boolean} True is there is a winner (not empty and 3 in row that
 * match) or False is these conditions are not met.
 */
function isWinner(grid) {
  /**
   * @property {string} marker property on the object representing the tictactoe
   * square. Values are either "","x", or "o".
   */
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

/**
 * Check if grid still has empty spaces (equal to ""). This allows us to know
 * continue play or if we have a draw.
 * @param {Array.<Array.<Object>>} grid Two dimensional array with objects
 * representing a tictactoe square
 * @returns {boolean} True if there is at least one square equal to "".  false
 * otherwise.
 */
function stillHasSpaces(grid) {
  /**
   * 1st some call to enter grid and allow iteration of inner arrays, accepts
   * callback some returns a boolean if callback returns true once. accepts
   * callback
   * @param {anonymousCallBack1} cb1 callback to check truthiness (in this case
   * it's for each array in grid)
   * @returns {Array} unmutated array inside grid
   * @returns {boolean} true if callback returns true
   */
  /**
   * @callback cb1
   * @param {Array} row Array of objects representing rows in the grid
   */
  return grid.some((row) => {
    /**
     * 2nd some call to check if value object.marker equals empty string
     * @param {anonymousCallBack2} cb2 callback to check truthiness
     * @returns {boolean} true if property marker in object square equals empty
     * string
     */
    /**
     * @callback cb2
     * @param {Object} square Object containing the marker property where we set
     * the value of the square.
     * @property {string} square.marker value of square we set it to "x" or "o"
     * defaults to "".
     * @returns {boolean} As soon as square.marker equals "" once, returns true
     * to the entire stillHasSpaces function, else returns false.
     */
    return row.some((square) => square.marker === "");
  });
}

/**
 * Players taking turns, changes current marker from "x" to "o" or vice verca
 * @param {string} marker takes the current marker "x" or "o"
 * @returns {string} Returns the opposite of marker, "x" or "o"
 */
function getCurrentMarker(marker) {
  return marker === "x" ? "o" : "x";
}

/**
 * Players taking turns, returns the name of the player who's turn it is next
 * after previous player moved (placed marker) note this function is called to
 * reassign the current player name and so will usually be called after current
 * player has physically placed a marker and win and draw validations are
 * complete
 * @param {string} currentName name of player who needs to move (place marker)
 * @param {string} playerA name of player assinged to this param
 * @param {string} playerB name of player assinged to this param
 * @returns {string} Name of player who does not equal currentName
 */
function getCurrentName(currentName, playerA, playerB) {
  return currentName === playerA ? playerB : playerA;
}

/**
 * uses Math.random() api which returns a float between 0 and .9 repeating to
 * give a 50 50 chance of returning an "x" or an "o".  Used to select the player
 * who goes first at random.
 * @returns {string} "x" if Math.random() returns less than .5 or "o" if
 * otherwise
 */
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

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
 * @param {Number} rowPosition This number represents the eventual position of the
 * row in the grid, it increments at a different rate than the loop hence why is
 * used later in createGrid(size);
 * @returns {Array.<Object>} The array of objects representing "squares" in a
 * row.  Each array is a row in the grid.
 */
function createRow(size, rowPosition) {
  /**
   * new Array creates an array of length size filled with undefined items the
   * map fills those items one by one.
   * @param {Object} el el represents the undefined item in the new Array, it is
   * not use but importantly holds the 1st parameter position to allow for the
   * index columnPosition (2nd parameter) to be used in the map
   * @param {Number} columnPosition it is the index used in iteration of map,
   * here it is used to mark the columnPosition of the Object eventually in the
   * grid
   */
  return [...new Array(size)].map((el, columnPosition) => {
    /**
     * the returned object has three properties
     * @property {Number} id The unique id of the square object
     * @property {string} marker The marker starts as "" and will be filled by
     * "x" or "o"
     * @property {boolean} isWinningSquare Boolean that marks if the
     * square(object) is one of the three in a row that marks a winner
     * @property {Array.<Number>} position Array with two numbers between 0 and
     * 2 representing the index position of the object in the grid
     */
    return {
      id: squareId++,
      marker: "",
      isWinningSquare: false,
      position: [rowPosition, columnPosition],
    };
  });
}

/**
 * Creates a grid from rows made by createRow(size, rowPosition);
 * @param {Number} size The height of the grid, or how many rows in the grid.
 * For example a 3x3 grid, size would be 3
 * @returns {Array.<Array.<Object>>} Returns newGrid a nested Array with however many
 * arrays inside as the number size. The quantity of objects inside each array
 * also matches size.
 */
function createGrid(size) {
  /**
   * will create a new array filled with the arrays (newGrid) returned by createRow
   * @param {Number} rowPosition index representing the row position of the
   * objects made by createRow The rowPosition index begins at -1 because we
   * need to iterate over it in the map
   * and it will not iterate if we place it after the return statement
   */
  let rowPosition = -1;
  const newGrid = [...new Array(size)].map(() => {
    rowPosition++;
    return createRow(size, rowPosition);
  });
  squareId = 1; //reset id so that we only have id's 1-9 for aria-label;
  return newGrid;
}

/**
 * Dertermines if there's a  Winner by checking if object value marker is not
 * empty and equal to the other markers in a row in any direction (horzontal,
 * vertical, diagonal). Function can check an NxN grid.
 * @param {Array.<Array.<Object>>} grid grid Two dimensional array with objects
 * representing a tictactoe square
 * @returns {(Array | boolean)} Returs an Array containing the position indexes
 * of the squares that match 3 in a row. False if these conditions are not met.
 */
function isWinner(grid) {
  const maxIndex = grid.length - 1;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      //horizontal check
      if (grid[i][j + maxIndex]) {
        const tempArr = [];
        let matchCounter = 0;
        let tempCounter = 0;
        while (tempCounter < grid.length) {
          if (
            grid[i][j].marker !== "" &&
            grid[i][j].marker === grid[i][j + matchCounter].marker
          ) {
            tempArr.push([i, j + matchCounter]);
            matchCounter++;
          }
          tempCounter++;
        }
        if (matchCounter === grid.length) {
          return tempArr;
        }
      }
      //vertical check
      if (grid[i + maxIndex]) {
        const tempArr = [];
        let matchCounter = 0;
        let tempCounter = 0;
        while (tempCounter < grid.length) {
          if (
            grid[i][j].marker !== "" &&
            grid[i][j].marker === grid[i + matchCounter][j].marker
          ) {
            tempArr.push([i + matchCounter, j]);
            matchCounter++;
          }
          tempCounter++;
        }
        if (matchCounter === grid.length) {
          return tempArr;
        }
      }
      //diagonal check top left to bottom right
      if (grid[i + maxIndex] && grid[i + maxIndex][j + maxIndex]) {
        const tempArr = [];
        let matchCounter = 0;
        let tempCounter = 0;
        while (tempCounter < grid.length) {
          if (
            grid[i][j].marker !== "" &&
            grid[i][j].marker ===
              grid[i + matchCounter][j + matchCounter].marker
          ) {
            tempArr.push([i + matchCounter, j + matchCounter]);
            matchCounter++;
          }
          tempCounter++;
        }
        if (matchCounter === grid.length) {
          return tempArr;
        }
      } //diagonal check top right to bottom left
      if (grid[i + maxIndex] && grid[i][j + maxIndex]) {
        const tempArr = [];
        let matchCounter = 0;
        let tempCounter = 0;
        while (tempCounter < grid.length) {
          if (
            grid[i][j + maxIndex].marker !== "" &&
            grid[i][j + maxIndex].marker ===
              grid[i + matchCounter][j + maxIndex - matchCounter].marker
          ) {
            tempArr.push([i + matchCounter, j + maxIndex - matchCounter]);
            matchCounter++;
          }
          tempCounter++;
        }
        if (matchCounter === grid.length) {
          return tempArr;
        }
      }
    }
  }
  return false;
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
function getNextMarker(marker) {
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
function getNextName(currentName, playerA, playerB) {
  return currentName === playerA ? playerB : playerA;
}

/**
 * Gives a 50 50 chance of returning an "x" or an "o".  Used to select the
 * player who goes first at random.
 * @param {Number} randomNumber is expected to to take the Math.random() api
 * which returns a Number between 0 inclusive and 1 (not inclusive)
 * @returns {string} "x" if Math.random() returns less than .5 or "o" if
 * otherwise
 */
function selectFirstPlayer(randomNumber) {
  const FIFTY_PERCENT_CHANCE = 0.5;
  return randomNumber < FIFTY_PERCENT_CHANCE ? "x" : "o";
}

// function moveComputer(grid, currentMarker) {
//   return minimax(grid, 0, true, currentMarker);
// }

// function minimax(newGrid, depth, isComputer, currentMarker) {
//   const result = isWinner(newGrid);
//   const freeSpaces = stillHasSpaces(newGrid);

//   if (result === false && freeSpaces) {
//     //not win or tie
//     const scores = [];
//     const gridCopy = newGrid.map((square) => square);
//     console.log(gridCopy);
//     for (let i = 0; i < gridCopy.length; i++) {
//       for (let j = 0; j < gridCopy[i].length; j++) {
//         if (gridCopy[i][j].marker === "") {
//           console.log("hi", gridCopy[i][j], currentMarker);
//           gridCopy[i][j].marker = currentMarker;
//           const score = minimax(
//             gridCopy,
//             depth + 1,
//             isComputer === true ? false : true,
//             currentMarker === "x" ? "o" : "x"
//           );
//           scores.push({ score, position: [i, j] });
//           console.log(scores);
//         }
//       }
//     }
//     if (isComputer) {
//       console.log("max", scores);
//       const max = scores.reduce((prev, curr) => {
//         console.log(prev, curr);
//         return prev.score > curr.score ? prev : curr, null;
//       });
//       if (depth === 0) {
//         return max.position;
//       } else {
//         return max.score;
//       }
//     } else {
//       console.log("min", scores);
//       const min = scores.reduce((prev, curr) => {
//         console.log(prev, curr);
//         return prev.score < curr.score ? prev : curr, null;
//       });
//       if (depth === 0) {
//         return min.position;
//       } else {
//         return min.score;
//       }
//     }
//   } else if (!freeSpaces) {
//     //tie
//     return 0;
//   } else if (result && !isComputer) {
//     //human won
//     return depth - 10;
//   } else if (result && isComputer) {
//     //computer won
//     return 10 - depth;
//   }
// }

export {
  createGrid,
  isWinner,
  stillHasSpaces,
  getNextMarker,
  getNextName,
  selectFirstPlayer,
  // moveComputer,
};

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
    this.userView = "entrance"; //game starts with welcome page
  }

  @tracked userView; //{string} used to decide what to render to the user
  //{boolean} name submit button disabled by default
  @tracked disabledSubmit = true;
  @tracked currentMarker; //{string} current marker either "x" or "o"
  @tracked currentName; //{string} Name of player who's move it is
  @tracked playerA; //{string} Name of player from first input
  @tracked playerB; //{string} Name of player from second input
  @tracked draw; //{boolean} true if no more spaces and no winner
  @tracked winner; //{string} name of winner

  /**
   * creates a nested array with as many arrays as size and as many objects in
   * the arrays as size and attatches the grid to the model so it can be
   * rendered in the templates
   * @param {Number} size This number is flexible and will create an NxN grid,
   * later it will be called with 3 for tictactoe
   * @returns {undefined}
   */
  setGrid(size) {
    this.set("model.grid", createGrid(size));
  }

  /**
   * enables the submit button on the player name form
   * it does this by checking that both inputs have a value
   * both must have a value to be enabled
   */
  enableSubmit() {
    if (this.playerA && this.playerB) {
      this.disabledSubmit = false;
    } else {
      this.disabledSubmit = true;
    }
  }
  @action
  showInputNames() {
    this.userView = "playerNames";
  }

  /**
   * assigns the value in text input field to this.playerA in Controller
   * @param {Object} e Dom input event
   */
  @action
  inputPlayerA(e) {
    this.playerA = e.target.value;
    this.enableSubmit();
  }

  /**
   * assigns the value in text input field to this.playerB in Controller
   * @param {Object} e DOM input event
   */
  @action
  inputPlayerB(e) {
    this.playerB = e.target.value;
    this.enableSubmit();
  }

  /**
   * Action is called when user submits the player names this action sets state
   * on the controller and sets the names and markers for the players in the
   * model
   * @param {Object} e DOM submit event
   */
  @action
  newGame(e) {
    e.preventDefault();
    this.userView = "playingGame"; //reveals the grid and player sections
    this.winner = null;
    this.draw = null;
    this.currentMarker = "x"; // first move is x
    set(this.model.players[0], "name", this.playerA);
    set(this.model.players[1], "name", this.playerB);

    const firstPlayer = selectFirstPlayer(Math.random());
    if (firstPlayer === "x") {
      set(this.model.players[0], "marker", "x");
      set(this.model.players[1], "marker", "o");
      this.currentName = this.playerA;
    } else {
      set(this.model.players[1], "marker", "x");
      set(this.model.players[0], "marker", "o");
      this.currentName = this.playerB;
    }
    //actually creates the 3x3 grid
    //setGrid will respond to any size but currently set to 3
    this.setGrid(3);
  }

  /**
   * resets wins in the model for both playes to 0 setting this.userView to
   * "playerNames" which renders the form to ask for new player names so they can be
   * used to reassign.
   * Action is called when users want to play with new names
   */
  @action
  newPlayers() {
    set(this.model.players[0], "wins", 0);
    set(this.model.players[1], "wins", 0);
    this.userView = "playerNames";
  }

  /**
   * Action fired when user places a marker on the grid Each object representing
   * a square on the grid was assinged an attribute position.
   * @param {Array.<Number>} position an array length of 2 each is a number,
   * either 0,1,2.  Position is array of two numbers that represent the position
   * of the square in the grid using index position. This allows us to take that
   * information on the click event and pass it the function to change the value
   * of that position in the model. The model is only accessed using index
   * position and that is why we are doing this.
   */
  @action
  makeMove(position) {
    /**First the square's marker attribute in the model is changed to the
     *currentMarker.
     */
    set(
      this.model.grid[position[0]][position[1]],
      "marker",
      this.currentMarker
    );
    const winSquares = isWinner(this.model.grid);
    //if a winner winSquares returns an array with position indexes of the
    //winning squares
    if (winSquares) {
      //check for a winner
      //If true the winners wins attribute in the model increases by one
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
      /**
       * changes each square's isWinningSquare value to true in the model This
       * allows for rendering of the winning squares in the template
       * @param {Array} square is an array of two position indexes to acces the
       * squares in the model
       */
      winSquares.forEach((square) => {
        set(this.model.grid[square[0]][square[1]], "isWinningSquare", true);
      });
      this.userView = "endGame"; //view goes to end game on win
    } else if (!stillHasSpaces(this.model.grid)) {
      //check to see if there are more playable spaces
      this.draw = true;
      this.userView = "endGame"; //view goes to end game on draw
    } else {
      //if more free spaces, next turn, we update currentMarker and CurrentName
      this.currentMarker = getCurrentMarker(this.currentMarker);
      this.currentName = getCurrentName(
        this.currentName,
        this.playerA,
        this.playerB
      );
    }
  }
}

import {
  createGrid,
  isWinner,
  stillHasSpaces,
  getCurrentMarker,
  getCurrentName,
  selectFirstPlayer,
} from "tic-tac-toe/utils/tictactoe";
import { module, test } from "qunit";

module("Unit | Utility | tictactoe", function () {
  // Replace this with your real tests.
  test("it works", function (assert) {
    let result = createGrid(3);
    assert.ok(result);
  });
});

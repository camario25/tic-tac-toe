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
  const grid = [
    [
      {
        id: 1,
        isWinningSquare: false,
        marker: "",
        position: [0, 0],
      },
      {
        id: 2,
        isWinningSquare: false,
        marker: "",
        position: [0, 1],
      },
      {
        id: 3,
        isWinningSquare: false,
        marker: "",
        position: [0, 2],
      },
    ],
    [
      {
        id: 4,
        isWinningSquare: false,
        marker: "",
        position: [1, 0],
      },
      {
        id: 5,
        isWinningSquare: false,
        marker: "",
        position: [1, 1],
      },
      {
        id: 6,
        isWinningSquare: false,
        marker: "",
        position: [1, 2],
      },
    ],
    [
      {
        id: 7,
        isWinningSquare: false,
        marker: "",
        position: [2, 0],
      },
      {
        id: 8,
        isWinningSquare: false,
        marker: "",
        position: [2, 1],
      },
      {
        id: 9,
        isWinningSquare: false,
        marker: "",
        position: [2, 2],
      },
    ],
  ];

  const gridWinner = [
    [
      {
        id: 1,
        isWinningSquare: false,
        marker: "x",
        position: [0, 0],
      },
      {
        id: 2,
        isWinningSquare: false,
        marker: "x",
        position: [0, 1],
      },
      {
        id: 3,
        isWinningSquare: false,
        marker: "x",
        position: [0, 2],
      },
    ],
    [
      {
        id: 4,
        isWinningSquare: false,
        marker: "o",
        position: [1, 0],
      },
      {
        id: 5,
        isWinningSquare: false,
        marker: "o",
        position: [1, 1],
      },
      {
        id: 6,
        isWinningSquare: false,
        marker: "",
        position: [1, 2],
      },
    ],
    [
      {
        id: 7,
        isWinningSquare: false,
        marker: "",
        position: [2, 0],
      },
      {
        id: 8,
        isWinningSquare: false,
        marker: "",
        position: [2, 1],
      },
      {
        id: 9,
        isWinningSquare: false,
        marker: "",
        position: [2, 2],
      },
    ],
  ];

  const gridFull = [
    [
      {
        id: 1,
        isWinningSquare: false,
        marker: "x",
        position: [0, 0],
      },
      {
        id: 2,
        isWinningSquare: false,
        marker: "o",
        position: [0, 1],
      },
      {
        id: 3,
        isWinningSquare: false,
        marker: "x",
        position: [0, 2],
      },
    ],
    [
      {
        id: 4,
        isWinningSquare: false,
        marker: "o",
        position: [1, 0],
      },
      {
        id: 5,
        isWinningSquare: false,
        marker: "o",
        position: [1, 1],
      },
      {
        id: 6,
        isWinningSquare: false,
        marker: "x",
        position: [1, 2],
      },
    ],
    [
      {
        id: 7,
        isWinningSquare: false,
        marker: "x",
        position: [2, 0],
      },
      {
        id: 8,
        isWinningSquare: false,
        marker: "x",
        position: [2, 1],
      },
      {
        id: 9,
        isWinningSquare: false,
        marker: "o",
        position: [2, 2],
      },
    ],
  ];
  test("createGrid returns proper grid", function (assert) {
    const result = createGrid(3);
    assert.deepEqual(result, grid, "createGrid created proper 9 square grid ");
  });

  test("is winner returns array of positions when grid has 3 in a row", function (assert) {
    const result = isWinner(gridWinner);
    const EXPECTED_WINNER_POSITIONS = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    assert.deepEqual(
      result,
      EXPECTED_WINNER_POSITIONS,
      "correct winner positions returned"
    );
  });

  test("it returns proper boolean if grid has spaces or is full", function (assert) {
    const resultSpace = stillHasSpaces(gridWinner);
    assert.equal(resultSpace, true, "grid still has spaces");

    const resultNoSpace = stillHasSpaces(gridFull);
    assert.equal(resultNoSpace, false, "grid is full, a draw");
  });
  test("it should return opposite marker", function (assert) {
    const markerX = "x";
    const markerO = "o";
    const result1 = getCurrentMarker("x");
    assert.equal(result1, markerO, "x was properly changed to o");
    const result2 = getCurrentMarker("o");
    assert.equal(result2, markerX, "o was properly changed to x");
  });

  test("should return name that does not match current name", function (assert) {
    const currentName = "test-name1";
    const playerA = "test-name1";
    const playerB = "test-name2";

    const result = getCurrentName(currentName, playerA, playerB);
    assert.equal(
      result,
      playerB,
      "properly changed player name to next player"
    );
  });
  test("should return either and x or an o", function (assert) {
    const resultX = selectFirstPlayer(0.4);
    assert.equal(resultX, "x", "random below .5 returns x");
    const resultO = selectFirstPlayer(0.6);
    assert.equal(resultO, "o", "random above .5 returns o");
  });
});

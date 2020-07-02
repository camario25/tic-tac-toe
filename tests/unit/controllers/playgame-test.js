import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | playgame", function (hooks) {
  setupTest(hooks);

  test("userView starts on player form", function (assert) {
    let controller = this.owner.lookup("controller:playgame");
    assert.ok(controller);
    assert.equal(
      controller.userView,
      "entrance",
      "view is set to player entrance"
    );
  });

  test("userView changes to playerNames form on showInputNames action", function (assert) {
    let controller = this.owner.lookup("controller:playgame");
    controller.send("showInputNames");
    assert.equal(
      controller.userView,
      "playerNames",
      "view is set to playerNames form"
    );
  });

  test("it changes playerA name on input action", function (assert) {
    let controller = this.owner.lookup("controller:playgame");
    const eventMock = {
      target: { value: "Player1-Name" },
    };
    assert.equal(controller.playerA, null, "playerA initialized");
    controller.send("inputPlayerA", eventMock);
    assert.equal(controller.playerA, "Player1-Name", "playerA updated");
  });
  test("it changes playerB name on input action", function (assert) {
    let controller = this.owner.lookup("controller:playgame");
    const eventMock = {
      target: { value: "Player2-Name" },
    };
    assert.equal(controller.playerB, null, "playerB initialized");
    controller.send("inputPlayerB", eventMock);
    assert.equal(controller.playerB, "Player2-Name", "playerB updated");
  });
  test("it changes controller user view on form submit", function (assert) {
    const model = { grid: [], players: [{ name: "" }, { marker: "" }] };
    const eventMock = {
      target: { value: "test1" },
      preventDefault: function () {},
    };
    let controller = this.owner.lookup("controller:playgame");
    controller.set("model", model);
    controller.send("newGame", eventMock);

    assert.equal(
      controller.userView,
      "playingGame",
      "view is set to game play with grid and names"
    );
  });
  test("model updates with player names on submit", function (assert) {
    const playerA = "nameA";
    const playerB = "nameB";
    const modelMock = {
      grid: [],
      players: [
        { name: "", marker: "" },
        { name: "", marker: "" },
      ],
    };
    const eventMock = {
      target: { value: "test1" },
      preventDefault: function () {},
    };
    let controller = this.owner.lookup("controller:playgame");
    controller.set("model", modelMock);
    controller.set("playerA", playerA);
    controller.set("playerB", playerB);
    controller.send("newGame", eventMock);

    assert.equal(
      controller.model.players[0].name,
      "nameA",
      "name for player x properly set in model"
    );
    assert.equal(
      controller.model.players[1].name,
      "nameB",
      "name for player o properly set in model"
    );
  });
  test("correctly updates model with currentMarker, makeMove action", function (assert) {
    const modelMock = { grid: [], players: [{ name: "" }, { marker: "" }] };
    const testPosition = [0, 0]; //test position index of a square in the grid
    const testCurrentMarker = "x";
    const eventMock = {
      target: { value: "test1" },
      preventDefault: function () {},
    };
    let controller = this.owner.lookup("controller:playgame");
    controller.set("model", modelMock);
    controller.set("currentMarker", testCurrentMarker);
    controller.send("newGame", eventMock);
    controller.send("makeMove", testPosition);

    assert.equal(
      controller.model.grid[0][0].marker,
      "x",
      "grid object was properly updated with marker in the model"
    );
  });
});

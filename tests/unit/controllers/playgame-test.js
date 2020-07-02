import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | playgame", function (hooks) {
  setupTest(hooks);

  test("it exists, and userView starts on player form", function (assert) {
    let controller = this.owner.lookup("controller:playgame");
    assert.ok(controller);
    assert.equal(
      controller.userView,
      "entrance",
      "view is set to player entrance"
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
  // test("it changes controller user view on form submit", function (assert) {
  //   const eventMock = {
  //     target: { value: "test1" },
  //     preventDefault: function () {},
  //   };
  //   let controller = this.owner.lookup("controller:playgame");
  //   assert.equal(
  //     controller.userView,
  //     "playerNames",
  //     "view is set to player form"
  //   );

  //   controller.send("newGame", eventMock);
  //   assert.equal(
  //     controller.userView,
  //     "playingGame",
  //     "view has changed to game play"
  //   );
  // });
  // test("it changes controller user view on new players submit", function (assert) {
  //   let controller = this.owner.lookup("controller:playgame");
  //   assert.ok(controller);
  //   assert.equal(
  //     controller.userView,
  //     "playerNames",
  //     "view is set to player form"
  //   );
  //   controller.send("newPlayers");
  // });
});

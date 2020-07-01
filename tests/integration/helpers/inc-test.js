import { module, todo } from "qunit";
// import { setupRenderingTest } from "ember-qunit";
// import { render } from "@ember/test-helpers";
// import { hbs } from "ember-cli-htmlbars";
import inc from "tic-tac-toe/helpers/inc";

module("Integration | Helper | inc", function (hooks) {
  todo("increments number by 1", function (assert) {
    assert.equal(inc([0]), 1, "correctly incremented number by 1");
  });
});

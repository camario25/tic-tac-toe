import { module, test } from "qunit";
import { visit, fillIn, click, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | playgame", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /", async function (assert) {
    await visit("/");

    assert.equal(currentURL(), "/playgame");
  });

  test("visiting /playgame", async function (assert) {
    await visit("/playgame");

    assert.equal(currentURL(), "/playgame");
  });

  test("should submit names and display to user", async function (assert) {
    await visit("/playgame");
    await fillIn("[data-test-input1]", "name1");
    await fillIn("[data-test-input2]", "name2");
    await click("[data-test-submit]");

    assert.equal(currentURL(), "/playgame");
  });
});

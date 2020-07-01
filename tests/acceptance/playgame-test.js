import { module, test } from "qunit";
import { visit, fillIn, click, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | playgame", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /", async function (assert) {
    assert.expect(1);
    await visit("/");
    assert.equal(
      currentURL(),
      "/playgame",
      "/ index correctly redirects to route /playgame"
    );
  });

  test("visiting /playgame should make form appear with two inputs and submit button", async function (assert) {
    assert.expect(5);
    await visit("/playgame");
    assert.equal(currentURL(), "/playgame", "route /playgame routes properly");
    assert.dom("[data-test='game-form']").exists();
    assert.dom("[data-test='input-1']").exists();
    assert.dom("[data-test='input-2']").exists();
    assert.dom("[data-test='button-submit']").exists();
  });

  test("should submit names and display names to user", async function (assert) {
    assert.expect(4);
    await visit("/playgame");
    await fillIn("[data-test='input-1']", "Test-Name1");
    await fillIn("[data-test='input-2']", "Test-Name2");
    assert.dom("[data-test='input-1']").hasValue("Test-Name1");
    assert.dom("[data-test='input-2']").hasValue("Test-Name2");
    await click("[data-test='button-submit']");
    assert.dom("[data-test='player-title-name-1']").hasText("Test-Name1");
    assert.dom("[data-test='player-title-name-2']").hasText("Test-Name2");
  });
  test("should display win totals - zero wins to start", async function (assert) {
    assert.expect(2);
    await visit("/playgame");
    await fillIn("[data-test='input-1']", "Test-Name1");
    await fillIn("[data-test='input-2']", "Test-Name2");
    await click("[data-test='button-submit']");
    assert.dom("[data-test='win-count-1']").hasText("Wins: 0");
    assert.dom("[data-test='win-count-2']").hasText("Wins: 0");
  });
  test("should display grid of nine empty buttons", async function (assert) {
    assert.expect(11);
    await visit("/playgame");
    await fillIn("[data-test='input-1']", "Test-Name1");
    await fillIn("[data-test='input-2']", "Test-Name2");
    await click("[data-test='button-submit']");
    assert.dom("[data-test='grid-container']").exists();
    assert.equal(
      this.element.querySelector("[data-test='grid-container']")
        .childElementCount,
      9,
      "grid has nine squares"
    );
    assert.dom("[data-test='game-button-free-1']").hasNoText();
    assert.dom("[data-test='game-button-free-2']").hasNoText();
    assert.dom("[data-test='game-button-free-3']").hasNoText();
    assert.dom("[data-test='game-button-free-4']").hasNoText();
    assert.dom("[data-test='game-button-free-5']").hasNoText();
    assert.dom("[data-test='game-button-free-6']").hasNoText();
    assert.dom("[data-test='game-button-free-7']").hasNoText();
    assert.dom("[data-test='game-button-free-8']").hasNoText();
    assert.dom("[data-test='game-button-free-9']").hasNoText();
  });
  test("clicks on grid should alternate 'x','o' starting with x", async function (assert) {
    assert.expect(3);
    await visit("/playgame");
    await fillIn("[data-test='input-1']", "Test-Name1");
    await fillIn("[data-test='input-2']", "Test-Name2");
    await click("[data-test='button-submit']");
    await click("[data-test='game-button-free-1']");
    assert.dom("[data-test='game-button-marked-1']").hasText("x");
    await click("[data-test='game-button-free-2']");
    assert.dom("[data-test='game-button-marked-2']").hasText("o");
    await click("[data-test='game-button-free-3']");
    assert.dom("[data-test='game-button-marked-3']").hasText("x");
  });
  test("winning combination should bring up end-modal with two replay buttons", async function (assert) {
    assert.expect(3);
    await visit("/playgame");
    await fillIn("[data-test='input-1']", "Test-Name1");
    await fillIn("[data-test='input-2']", "Test-Name2");
    await click("[data-test='button-submit']");
    await click("[data-test='game-button-free-1']");
    await click("[data-test='game-button-free-2']");
    await click("[data-test='game-button-free-5']");
    await click("[data-test='game-button-free-6']");
    await click("[data-test='game-button-free-9']");
    assert.dom("[data-test='end-modal']").exists();
    assert.dom("[data-test='button-same-players']").exists();
    assert.dom("[data-test='button-new-players']").exists();
  });
  test("clicking same players button brings up new grid with same player names", async function (assert) {
    assert.expect(11);
    await visit("/playgame");
    await fillIn("[data-test='input-1']", "Test-Name1");
    await fillIn("[data-test='input-2']", "Test-Name2");
    await click("[data-test='button-submit']");
    await click("[data-test='game-button-free-1']");
    await click("[data-test='game-button-free-2']");
    await click("[data-test='game-button-free-5']");
    await click("[data-test='game-button-free-6']");
    await click("[data-test='game-button-free-9']");
    await click("[data-test='button-same-players']");
    assert.dom("[data-test='player-title-name-1']").hasText("Test-Name1");
    assert.dom("[data-test='player-title-name-2']").hasText("Test-Name2");
    assert.dom("[data-test='game-button-free-1']").hasNoText();
    assert.dom("[data-test='game-button-free-2']").hasNoText();
    assert.dom("[data-test='game-button-free-3']").hasNoText();
    assert.dom("[data-test='game-button-free-4']").hasNoText();
    assert.dom("[data-test='game-button-free-5']").hasNoText();
    assert.dom("[data-test='game-button-free-6']").hasNoText();
    assert.dom("[data-test='game-button-free-7']").hasNoText();
    assert.dom("[data-test='game-button-free-8']").hasNoText();
    assert.dom("[data-test='game-button-free-9']").hasNoText();
  });
  test("clicking new players button brings up form to insert player names again", async function (assert) {
    assert.expect(1);
    await visit("/playgame");
    await fillIn("[data-test='input-1']", "Test-Name1");
    await fillIn("[data-test='input-2']", "Test-Name2");
    await click("[data-test='button-submit']");
    await click("[data-test='game-button-free-1']");
    await click("[data-test='game-button-free-2']");
    await click("[data-test='game-button-free-5']");
    await click("[data-test='game-button-free-6']");
    await click("[data-test='game-button-free-9']");
    await click("[data-test='button-new-players']");
    assert.dom("[data-test='game-form']").exists();
  });
});

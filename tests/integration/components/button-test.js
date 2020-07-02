import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | button", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders grid button properly", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    // await render(hbs`<Button />`);
    this.set("currentMarker", "x");
    this.set("makeMove", function (val) {
      return val;
    });
    this.set("square", { position: [0, 1], id: 2 });

    await render(hbs`
      <Button @type="button" @usage="grid"
      @class={{if (eq this.currentMarker "x") "grid__item grid__item--unmarked-x" "grid__item grid__item--unmarked-o"}}
      @clickFunction={{this.makeMove}} @param={{this.square.position}} @aria-label="Square {{this.square.id}} is free"
      @data-test="game-button-free-{{this.square.id}}">

      </Button>
    `);

    assert
      .dom("[data-test='game-button-free-2']")
      .hasClass("grid__item--unmarked-x");
    assert.dom("[data-test='game-button-free-2']").isNotDisabled();
    this.set("currentMarker", "o");
    assert
      .dom("[data-test='game-button-free-2']")
      .doesNotHaveClass("grid__item--unmarked-x");
  });

  test("it renders submit button disabled properly", async function (assert) {
    this.set("disabledSubmit", true);
    this.set("newGame", function (val) {
      return val;
    });
    this.set("square", { position: [0, 1], id: 2 });

    await render(hbs`
      <Button @type="submit"
      @class={{if this.disabledSubmit "form__button-submit form__button-submit--disabled" "form__button-submit"}}
      @function={{this.newGame }} @disabled={{this.disabledSubmit}} @data-test="button-submit">Play</Button>
    `);

    assert
      .dom("[data-test='button-submit']")
      .hasClass("form__button-submit--disabled");
    assert.dom("[data-test='button-submit']").isDisabled();
    this.set("disabledSubmit", false);
    assert
      .dom("[data-test='button-submit']")
      .doesNotHaveClass("form__button-submit--disabled");
    assert.dom("[data-test='button-submit']").isNotDisabled();
  });
});

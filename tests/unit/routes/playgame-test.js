import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | playgame', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:playgame');
    assert.ok(route);
  });
});

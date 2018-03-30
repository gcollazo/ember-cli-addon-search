import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | packages/list', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:packages/list');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('controller:packages/list', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    var controller = this.owner.lookup('controller:packages/list');
    assert.ok(controller);
  });
});

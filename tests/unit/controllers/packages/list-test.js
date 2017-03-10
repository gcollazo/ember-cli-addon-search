import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:packages/list', {
  // Specify the other units that are required for this test.
  needs: ['service:fastboot']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

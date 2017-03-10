import { moduleFor, test } from 'ember-qunit';

moduleFor('route:packages/list', 'Unit | Route | packages/list', {
  // Specify the other units that are required for this test.
  needs: ['service:fastboot']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});

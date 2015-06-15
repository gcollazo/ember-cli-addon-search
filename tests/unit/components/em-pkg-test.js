import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import { initialize } from '../../../initializers/ember-moment';

moduleForComponent('em-pkg', 'Unit | Component | em pkg', {
  // Specify the other units that are required for this test
  needs: ['helper:split-prefix', 'component:observer-score'],
  unit: true,
  setup: function (container) {
    Ember.run(function () {
      initialize(container);
    });
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

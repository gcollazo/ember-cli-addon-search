import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('em-pkg', 'Unit | Component | em pkg', {
  // Specify the other units that are required for this test
  needs: [
  	'service:moment',
    'helper:split-prefix',
    'helper:moment-from-now',
    'component:observer-score',
    'component:em-icon-clipboard'
  ],
  unit: true
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

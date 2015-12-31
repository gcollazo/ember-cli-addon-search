import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('em-header', 'Unit | Component | em header', {
  needs: ['component:em-pkg', 'component:em-pagination', 'component:fa-icon'],

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

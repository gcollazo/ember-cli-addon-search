import Ember from 'ember';

export default Ember.Component.extend({
  tagName:     'span',
  value:       null,
  name:        null,
  isSorted:    null,
  isAscending: null,

  valueDidChange: function () {
    var m = (this.get('value') || '').split(':');
    var asc = true;
    if (m.length > 1 && m.pop() === 'desc') {
      asc = false;
    }
    m = m.shift();
    this.setProperties({
      isSorted:    m === this.get('name'),
      isAscending: asc
    });
  }.observes('value', 'name').on('init')
});

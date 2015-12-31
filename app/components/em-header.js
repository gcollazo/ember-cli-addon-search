import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',

  placeholder: Ember.computed('packageCount', function() {
    return `Search ${this.get('packageCount')} addons`;
  })
});

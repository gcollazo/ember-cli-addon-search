import Ember from 'ember';

export default Ember.Component.extend({
  reverseSort: true,

  actions: {
    sort: function() {
      this.toggleProperty('reverseSort');
      this.sendAction('sort', this.get('by'), this.get('reverseSort'));
    }
  }
});

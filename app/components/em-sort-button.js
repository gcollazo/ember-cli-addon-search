import Ember from 'ember';

export default Ember.Component.extend({
  reverseSort: false,

  actions: {
    sort: function() {
      this.toggleProperty('reverseSort');
      this.sendAction('sort', this.get('reverseSort'));
    }
  }
});

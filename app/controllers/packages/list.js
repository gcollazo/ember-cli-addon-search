import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query'],

  actions: {
    sortBy: function(by, reverse) {
      var sorted =  this.get('model').sortBy(by);
      if (reverse) { sorted.reverse(); }
      this.set('model', sorted);
    }
  }
});

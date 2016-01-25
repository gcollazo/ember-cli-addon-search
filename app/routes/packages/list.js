import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    query: {
      replace: true
    }
  },

  model: function() {
    return this.store.findAll('package');
  },

  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    this.controllerFor(this.routeName).set('packageCount', model.get('length'));
  }
});

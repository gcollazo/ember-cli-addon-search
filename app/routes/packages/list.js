import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  queryParams: {
    query: {
      replace: true
    }
  },

  model: function() {
    return this.store.findAll('package');
  },

  setupController: function(controller, model) {
    this._super(...arguments);
    this.controllerFor(this.routeName).set('packageCount', model.get('length'));
  }
});

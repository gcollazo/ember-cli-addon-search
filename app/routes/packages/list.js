import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.findAll('package');
  },

  setupController: function (controller, model) {
    this._super.apply(this, arguments);
    this.controllerFor('application').set('packageCount', model.get('length'));
  }
});

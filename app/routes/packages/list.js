import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.findAll('package').then(function(packages){
      return packages.reject(function(pkg) {
        return pkg.get('-name').match(/^ember-cli-fill-murray-/);
      });
    });
  },

  setupController: function (controller, model) {
    this._super.apply(this, arguments);
    this.controllerFor('application').set('packageCount', model.get('length'));
  }
});

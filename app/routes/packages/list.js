import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  queryParams: {
    query: {
      replace: true
    }
  },

  model: function() {
    var packages = this.get('store').find('package');

    return packages.then(function(result) {
      return result.sortBy('time.modified').reverse();
    });
  },

  setupController: function (controller, model) {
    this._super.apply(this, arguments);
    this.controllerFor('application').set('packageCount', model.get('length'));
  }
});

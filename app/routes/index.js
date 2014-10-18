import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  queryParams: {
    query: {replace: true}
  },

  model: function() {
    return ajax('https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('packageCount', model.length);
  }
});

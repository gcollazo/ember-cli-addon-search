import Ember from 'ember';
import Package from '../models/package';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function () {
    return ajax('https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json');
  },

  setupController: function (controller, model) {
    this._super(controller, model.map(function (item) {
      return Package.create(item);
    }));
    this.controllerFor('application').set('packageCount', model.length);
  }
});

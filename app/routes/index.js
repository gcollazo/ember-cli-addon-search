import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    return ajax('https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json');
  }
});

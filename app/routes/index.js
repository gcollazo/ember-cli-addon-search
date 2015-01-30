import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    var url = 'https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json';
    return ajax(url);
  }
});

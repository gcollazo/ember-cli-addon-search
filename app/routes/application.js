import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var url = 'https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json';
    return Ember.$.getJSON(url);
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var url = 'http://ember-addons-server.herokuapp.com/';
    return Ember.$.getJSON(url);
  }
});

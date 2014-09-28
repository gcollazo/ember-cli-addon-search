import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var cache = window.localStorage;

    if (cache && 'emberCLIAddons' in cache && 'lastUpdate' in cache) {
      var lastUpdate = (new Date() - new Date(cache.lastUpdate)) / 1000,
          intervalInSeconds = 5 * 60;

      if (lastUpdate < intervalInSeconds) {
        return JSON.parse(cache.emberCLIAddons);
      }
    }

    var url = 'http://ember-addons-server.herokuapp.com/';
    return Ember.$.getJSON(url).then(function(data) {
      cache.emberCLIAddons = JSON.stringify(data);
      cache.lastUpdate = new Date();
      return data;
    });
  }
});

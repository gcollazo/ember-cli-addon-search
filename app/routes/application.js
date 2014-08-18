import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // Proxy server source: https://gist.github.com/gcollazo/43c4c392f52bc46cc2aa
    var url = 'http://npm-proxy-cors.herokuapp.com/-/_view/byKeyword?startkey=["ember-addon"]&endkey=["ember-addon",{}]&group_level=3';

    return Ember.$.getJSON(url).then(function(data) {
      return data.rows.map(function(line) {
        return Ember.Object.create({
          name: line.key[1],
          description: line.key[2]
        });
      });
    });
  }
});

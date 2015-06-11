import DS from 'ember-data';
import config from 'ember-addons-website/config/environment';

export default DS.RESTAdapter.extend({
  host: config.host,

  buildURL: function(/* type, id */) {
    return this.get('host') + '/addons.json';
  }
});

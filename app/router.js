import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('packages', { resetNamespace: true, path: '/' }, function() {
    this.route('list', { path: '/' });
  });
});

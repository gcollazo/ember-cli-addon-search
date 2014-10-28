import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.resource('packages', { path: '/' }, function () {
    this.route('list', { path: '/' });
  });
});

export default Router;

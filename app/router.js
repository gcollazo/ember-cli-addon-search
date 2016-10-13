import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,

  willTransition() {
    this._super(...arguments);
    performance.mark('willTransition');
  },

  didTransition() {
    this._super(...arguments);
    performance.mark('didTransition');
  },

  rootURL: config.rootURL
});

export default Router.map(function() {
  this.route('packages', { resetNamespace: true, path: '/' }, function() {
    this.route('list', { path: '/' });
  });
});

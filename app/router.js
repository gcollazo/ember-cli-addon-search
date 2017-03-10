import Ember from 'ember';
import config from './config/environment';

const {
  inject
} = Ember;

const Router = Ember.Router.extend({
	fastboot: inject.service(),

  location: config.locationType,

  willTransition() {
    this._super(...arguments);

    if (this.get('fastboot.isFastBoot')) {
  		return;
  	}

    performance.mark('willTransition');
  },

  didTransition() {
    this._super(...arguments);

    if (this.get('fastboot.isFastBoot')) {
  		return;
  	}
  	
    performance.mark('didTransition');
  },

  rootURL: config.rootURL
});

export default Router.map(function() {
  this.route('packages', { resetNamespace: true, path: '/' }, function() {
    this.route('list', { path: '/' });
  });
});

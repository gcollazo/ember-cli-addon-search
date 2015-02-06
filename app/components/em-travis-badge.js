import Ember from 'ember';

export default Ember.Component.extend({
  travisBadgeURL: function() {
    var _github = this.get('github');

    if (_github) {
      return 'https://travis-ci.org/' + _github.user + '/' + _github.repo + '.svg?branch=master';
    }

  }.property('github').readOnly()
});

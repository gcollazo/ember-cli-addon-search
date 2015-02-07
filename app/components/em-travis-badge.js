import Ember from 'ember';

export default Ember.Component.extend({
  travisBadgeURL: function() {
    return this.get('travisLinkURL') + '.svg?branch=master';
  }.property('github').readOnly(),

  travisLinkURL: function() {
    var _github = this.get('github');
    if (_github) {
      return 'https://travis-ci.org/' + _github.user + '/' + _github.repo;
    }
  }.property('github').readOnly()
});

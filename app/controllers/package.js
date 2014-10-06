import Ember from 'ember';

export default Ember.ObjectController.extend({
  npmLink: function() {
    return 'https://www.npmjs.org/package/' + this.get('name');
  }.property('name'),

  gravatarURL: function() {
    return this.get('_npmUser.gravatar') + '?s=30&d=retro';
  }.property('_npmUser.gravatar'),

  travisBadgeURL: function() {
    var user = this.get('github.user'),
        repo = this.get('github.repo');

    return 'https://travis-ci.org/'+ user +'/'+ repo +'.svg?branch=master';
  }.property()
});

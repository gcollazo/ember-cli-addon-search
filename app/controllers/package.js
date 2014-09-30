import Ember from 'ember';

export default Ember.ObjectController.extend({
  npmLink: function() {
    return 'https://www.npmjs.org/package/' + this.get('name');
  }.property('name'),

  gravatarURL: function() {
    return this.get('doc._npmUser.gravatar') + '?s=30&d=retro';
  }.property('doc._npmUser.gravatar'),

  travisBadgeURL: function() {
    var user = this.get('doc.github.user'),
        repo = this.get('doc.github.repo');
    return 'https://travis-ci.org/'+ user +'/'+ repo +'.svg?branch=master';
  }.property()
});

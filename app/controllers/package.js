import Ember from 'ember';

export default Ember.ObjectController.extend({
  npmLink: function() {
    return 'https://www.npmjs.org/package/' + this.get('name');
  }.property('name'),

  gravatarURL: function() {
    return this.get('doc._npmUser.gravatar') + '?s=30&d=retro';
  }.property('doc._npmUser.gravatar')
});

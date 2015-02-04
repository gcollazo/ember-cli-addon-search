import Ember from 'ember';

export default Ember.Component.extend({
  gravatar: function() {
    return this.get('user.gravatar') + '?s=30&d=retro';
  }.property('user.gravatar').readOnly(),

  npmURL: function() {
    return 'https://npmjs.org/~' + this.get('user.name');
  }.property('user.name').readOnly()
});

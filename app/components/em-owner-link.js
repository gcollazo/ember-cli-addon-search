import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  profileUrl: function() {
    return 'https://npmjs.org/~/' + this.get('user.name');
  }.property('user.name').readOnly()
});

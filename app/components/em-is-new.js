import Ember from 'ember';

// one week
var NEW_DIFF = 7 * 24 * 60 * 60 * 1000;

export default Ember.Component.extend({
  tagName: 'span',
  isNew: function() {
    var _updated = new Date(this.get('createdDate'));
    return Date.now() -  _updated < NEW_DIFF;
  }.property('createdDate').readOnly()
});

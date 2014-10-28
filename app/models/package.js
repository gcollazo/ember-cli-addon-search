import Ember from 'ember';

// one week
var NEW_DIFF = 7 * 24 * 60 * 60 * 1000;

export default Ember.Object.extend({
  // ======= helpers for sorting and searching =====

  '-modified': function () {
    // by default we want it to be sorted in reverse
    return -this.get('modifiedAt');
  }.property('modifiedAt').readOnly(),

  '-created': function () {
    // by default we want it to be sorted in reverse
    return -this.get('createdAt');
  }.property('createdAt').readOnly(),

  '-name': function () {
    return this.get('name').trim().toLowerCase();
  }.property('name').readOnly(),

  '-owner': function () {
    return (this.get('owner.name') || '').trim().toLowerCase();
  }.property('owner.name').readOnly(),

  '-description': function () {
    return (this.get('description') || '').trim().toLowerCase();
  }.property('description').readOnly(),

  '-downloads': function () {
    return this.get('downloadedCount') || 0;
  }.property('downloadedCount').readOnly(),

  isNew: function () {
    return Date.now() - this.get('createdAt') < NEW_DIFF;
  }.property('createdAt').readOnly()
});

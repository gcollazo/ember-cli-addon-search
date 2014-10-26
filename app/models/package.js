import Ember from 'ember';

export default Ember.ObjectProxy.extend({
  sanitizedName: function() {
    return (this.get('name') || '').trim().toLowerCase();
  }.property('name').readOnly(),

  sanitizedAuthorName: function() {
    return (this.get('authorName') || '').trim().toLowerCase();
  }.property('authorName').readOnly(),

  sanitizedDownloadCount: function() {
    return Number(this.get('downloadCount') || 0);
  }.property('downloadCount').readOnly(),

  sanitizedModifiedAt: function() {
    return window.moment(this.get('modifiedAt')).unix();
  }.property('modifiedAt').readOnly(),

  sanitizedDescription: function() {
    return (this.get('description') || '').trim().toLowerCase();
  }.property('description').readOnly(),

  npmLink: function () {
    return 'https://www.npmjs.org/package/' + this.get('name');
  }.property('name').readOnly(),

  gravatarURL: function () {
    return this.get('_npmUser.gravatar') + '?s=30&d=retro';
  }.property('_npmUser.gravatar').readOnly(),

  authorName: Ember.computed.oneWay('_npmUser.name'),

  travisBadgeURL: function () {
    var user = this.get('github.user'),
      repo = this.get('github.repo');
    return 'https://travis-ci.org/' + user + '/' + repo + '.svg?branch=master';
  }.property('github.user', 'github.repo').readOnly(),

  npmProfileURL: function () {
    return 'https://npmjs.org/~' + this.get('authorName');
  }.property('authorName').readOnly(),

  isNew: function () {
    var createdMoment = window.moment(this.get('time.created'));
    var sevenDaysAgo = window.moment().subtract(7, 'days');
    return createdMoment.isAfter(sevenDaysAgo);
  }.property('time.created').readOnly(),

  downloadCount: Ember.computed.oneWay('downloads.downloads'),

  modifiedAt: Ember.computed.oneWay('time.modified')
});

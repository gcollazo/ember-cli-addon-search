import Ember from 'ember';

var npmBaseURL = 'https://npmjs.org/';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['package'],

  downloads: Ember.computed.readOnly('pkg.downloads.downloads'),
  updated: Ember.computed.readOnly('pkg.time.modified'),

  user: Ember.computed.readOnly('pkg._npmUser'),
  gravatar: function() {
    return this.get('user.gravatar') + '?s=30&d=retro';
  }.property('user.gravatar').readOnly(),

  npmPackageURL: function() {
    return npmBaseURL + this.get('pkg.name');
  }.property('pkg.name').readOnly(),

  npmAuthorURL: function() {
    return npmBaseURL + '~' + this.get('user.name');
  }.property('user.name').readOnly()

});

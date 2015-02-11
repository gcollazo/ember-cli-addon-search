import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['package'],

  owner: Ember.computed.readOnly('pkg._npmUser.name'),
  name: Ember.computed.readOnly('pkg.name'),
  description: Ember.computed.readOnly('pkg.description'),
  downloads: Ember.computed.readOnly('pkg.downloads.downloads'),
  updated: Ember.computed.readOnly('pkg.time.modified'),
  created: Ember.computed.readOnly('pkg.time.created'),
  github: Ember.computed.readOnly('pkg.github'),

  npmPackageURL: function() {
    return 'https://npmjs.org/' + this.get('pkg.name');
  }.property('pkg.name').readOnly()
});

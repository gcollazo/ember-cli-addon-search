import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['package'],

  name: Ember.computed.readOnly('pkg.name'),
  description: Ember.computed.readOnly('pkg.description'),
  downloads: Ember.computed.readOnly('pkg.downloads.downloads'),
  updated: Ember.computed.readOnly('pkg.time.modified'),
  created: Ember.computed.readOnly('pkg.time.created'),

  npmPackageURL: function() {
    return 'https://npmjs.org/' + this.get('pkg.name');
  }.property('pkg.name').readOnly()
});

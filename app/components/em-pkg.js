import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['package'],
  classNameBindings: ['matchFilter:visible:hidden'],

  owner: Ember.computed.alias('pkg._npmUser.name'),
  name: Ember.computed.alias('pkg.name'),
  description: Ember.computed.alias('pkg.description'),
  downloads: Ember.computed.alias('pkg.downloads.downloads'),
  updated: Ember.computed.alias('pkg.time.modified'),
  created: Ember.computed.alias('pkg.time.created'),

  npmPackageURL: function() {
    return 'https://npmjs.org/' + this.get('pkg.name');
  }.property('pkg.name').readOnly(),

  matchFilter: function() {
    var query = this.get('query');
    return !query ||
      this.get('name').toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
      this.get('owner').toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
      this.get('description').toLowerCase().indexOf(query.toLowerCase()) >= 0;
  }.property('query').readOnly()
});

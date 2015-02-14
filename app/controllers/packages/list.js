import Ember from 'ember';

var SROLL_TO_POSITION = 250;

export default Ember.Controller.extend({
  queryParams: ['query'],

  offset: 0,
  limit: 12,

  foundCount: 0,
  nothingFound: Ember.computed.equal('foundCount', 0),
  nextDisabled: Ember.computed.not('hasNextPage'),
  previousDisabled: Ember.computed.not('hasPreviousPage'),

  onQueryChange: function() {
    this.set('offset', 0);
  }.observes('query'),

  currentPageContent: function() {
    var offset = this.get('offset'),
        limit = this.get('limit'),
        query = this.get('query');

    var result = this.get('model').filter(function(item) {
      return !query ||
        item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        item._npmUser.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        item.description.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    });

    this.set('foundCount', result.length);

    return result.slice(offset, offset + limit);
  }.property('offset', 'model', 'query').readOnly(),

  hasPreviousPage: function() {
    return this.get('offset') !== 0;
  }.property('offset').readOnly(),

  hasNextPage: function() {
    var offset = this.get('offset'),
        limit = this.get('limit'),
        length = this.get('foundCount');

    return (offset + limit) < length;
  }.property('offset', 'limit', 'foundCount').readOnly(),

  actions: {
    sortBy: function(by, reverse) {
      var sorted =  this.get('model').sortBy(by);
      if (reverse) { sorted.reverse(); }
      this.set('model', sorted);
    },

    nextPage: function() {
      if (this.get('hasNextPage')) {
        var limit = this.get('limit');
        this.incrementProperty('offset', limit);
        window.scrollTo(0, SROLL_TO_POSITION);
      }
    },

    previousPage: function() {
      if (this.get('hasPreviousPage')) {
        var limit = this.get('limit');
        this.decrementProperty('offset', limit);
        window.scrollTo(0, SROLL_TO_POSITION);
      }
    }
  }
});

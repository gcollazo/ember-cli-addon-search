import Ember from 'ember';

var SROLL_TO_POSITION = 250;

export default Ember.Controller.extend({
  queryParams: ['query','page'],

  query: '',
  page: 1,
  limit: 12,

  foundCount: 0,
  nothingFound: Ember.computed.equal('foundCount', 0),
  nextDisabled: Ember.computed.not('hasNextPage'),
  previousDisabled: Ember.computed.not('hasPreviousPage'),

  currentPageContent: function() {
    var page = this.get('page'),
        limit = this.get('limit'),
        query = this.get('query');

    var result = this.get('model').filter(function(item) {
      return !query ||
        item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        item._npmUser.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        item.description.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    });

    this.set('foundCount', result.length);

    return result.slice((page - 1) * limit, page * limit);
  }.property('page', 'model', 'query').readOnly(),

  hasPreviousPage: function() {
    return this.get('page') !== 1;
  }.property('page').readOnly(),

  hasNextPage: function() {
    var page = this.get('page'),
        limit = this.get('limit'),
        length = this.get('foundCount');

    return (page * limit) < length;
  }.property('page', 'limit', 'foundCount').readOnly(),

  actions: {
    resetPage: function() {
      this.set('page', 1);
    },

    sortBy: function(by, reverse) {
      var sorted =  this.get('model').sortBy(by);
      if (reverse) { sorted.reverse(); }
      this.set('model', sorted);
    },

    nextPage: function() {
      if (this.get('hasNextPage')) {
        this.incrementProperty('page');
        window.scrollTo(0, SROLL_TO_POSITION);
      }
    },

    previousPage: function() {
      if (this.get('hasPreviousPage')) {
        this.decrementProperty('page');
        window.scrollTo(0, SROLL_TO_POSITION);
      }
    }
  }
});

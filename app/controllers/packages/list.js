import Ember from 'ember';
import computedFilterByQuery from 'ember-cli-filter-by-query';

var SROLL_TO_POSITION = 250;

export default Ember.Controller.extend({
  queryParams: ['query', 'page'],

  query: '',
  page: 1,
  limit: 12,

  filteredPackages: computedFilterByQuery('model.content',
    ['name', '_npmUser.name', 'description'], 'query', { conjunction: 'and' }
  ).readOnly(),

  sortAscending: true,
  sortProperty: 'time.modified',

  sortedPackages: Ember.computed('filteredPackages', 'sortProperty', 'sortAscending', function() {
    var sorted = this.get('filteredPackages').sortBy(this.get('sortProperty'));
    if (this.get('sortAscending')) {
      sorted.reverse();
    }
    return sorted;
  }).readOnly(),

  currentPageContent: Ember.computed('page', 'sortedPackages', 'query', function() {
    var page = this.get('page');
    var limit = this.get('limit');

    return this.get('sortedPackages').slice((page - 1) * limit, page * limit);
  }).readOnly(),

  nothingFound: Ember.computed.equal('sortedPackages.length', 0),
  nextDisabled: Ember.computed.not('hasNextPage'),
  previousDisabled: Ember.computed.not('hasPreviousPage'),

  hasPreviousPage: Ember.computed('page', function() {
    return this.get('page') !== 1;
  }).readOnly(),

  hasNextPage: Ember.computed('page', 'limit', 'sortedPackages.length', function() {
    var page = this.get('page');
    var limit = this.get('limit');
    var length = this.get('sortedPackages.length');

    return (page * limit) < length;
  }).readOnly(),

  actions: {
    resetPage: function() {
      this.set('page', 1);
    },

    sortBy: function(propertyKey) {
      if (propertyKey === this.get('sortProperty')) {
        this.toggleProperty('sortAscending');
      }
      this.set('sortProperty', propertyKey);
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

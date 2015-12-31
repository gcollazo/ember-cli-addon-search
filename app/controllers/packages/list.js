import Ember from 'ember';
import computedFilterByQuery from 'ember-cli-filter-by-query';

var SCROLL_TO_POSITION = 0;

export default Ember.Controller.extend({
  queryParams: ['query', 'page'],

  query: '',
  page: 1,
  limit: 12,
  packageCount: null,

  filteredPackages: computedFilterByQuery('model',
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
      this.incrementProperty('page');
      window.scrollTo(0, SCROLL_TO_POSITION);
    },

    previousPage: function() {
      this.decrementProperty('page');
      window.scrollTo(0, SCROLL_TO_POSITION);
    }
  }
});

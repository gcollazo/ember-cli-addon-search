import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import filterByQuery from 'ember-cli-filter-by-query/util/filter';

const {
  Component,
  computed,
  computed: { equal }
} = Ember;

const QUERY_DEBOUNCE = 300;

export default Component.extend({
  tagName: 'table',
  classNames: 'table table-packages',

  init() {
    this._super(...arguments);
    this._filterList(this.get('meta.query'));
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.get('taskFilterList').perform(this.get('meta.query'));
  },

  filteredList: [],
  taskFilterList: task(function* (query) {
    yield timeout(query ? QUERY_DEBOUNCE : 0);
    this._filterList(query);
  }).restartable(),

  _filterList(query) {
    const filteredList = filterByQuery(
      this.get('list'),
      ['name', '_npmUser.name', 'description'],
      query,
      { conjunction: 'and' }
    );
    this.set('filteredList', filteredList);
  },

  sortAscending: true,
  sortProperty: 'time.modified',

  sortedPackages: computed(
    'filteredList',
    'sortProperty',
    'sortAscending',
    function() {
      const sorted = this.get('filteredList')
        .sortBy(this.get('sortProperty'));

      if (this.get('sortAscending')) {
        sorted.reverse();
      }
      return sorted;
    }).readOnly(),

  currentPageContent: computed(
    'sortedPackages.[]', 'meta.{page,limit}',
    function() {
      const { page, limit } = this.get('meta');
      return this.get('sortedPackages').slice((page - 1) * limit, page * limit);
    }
  ).readOnly(),

  nothingFound: equal('sortedPackages.length', 0),

  actions: {
    sortBy(propertyKey) {
      if (propertyKey === this.get('sortProperty')) {
        this.toggleProperty('sortAscending');
      }
      this.set('sortProperty', propertyKey);
    }
  }
});

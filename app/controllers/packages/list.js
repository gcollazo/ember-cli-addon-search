import Ember from 'ember';

var DEFAULT_SORT = '-modified';

export default Ember.ArrayController.extend({
  itemController: 'packages/item',

  queryParams: {
    query: {as: 'q', replace: true},
    qpSort: 's',
    qpReverse: 'r'
  },

  sortProperties: [DEFAULT_SORT],
  sortAscending:  true,

  // used to show the user if a filtering is scheduled or not
  isFiltering: false,

  // used by query parameters and the match method in the item controllers
  query:          '',

  // beautify or parse the sort QP
  qpSort: function (key, value) {
    if (arguments.length > 1) {
      this.set('sortProperties', ['-' + value]);
    }
    return (this.get('sortProperties.firstObject') || DEFAULT_SORT).substr(1);
  }.property('sortProperties.firstObject'),

  // beatify or parse the sort order QP
  qpReverse: function (key, value) {
    if (arguments.length > 1) {
      this.set('sortAscending', !value);
    }
    return this.get('sortAscending') ? '' : '1';
  }.property('sortAscending'),

  // used by the input box
  searchInput: function (key, value) {
    if (arguments.length > 1) {
      this.set('isFiltering', true);
      Ember.run.debounce(this, 'updateQuery', value, 300);
    }
    else {
      value = this.get('query');
    }
    return value;
  }.property('query'),

  // in a function so that we can debounce it => the filtering and refreshing of URL isn't done on
  // each char
  updateQuery: function (value) {
    this.set('isFiltering', false);
    this.set('query', value || '');
  },

  // whether we have some items matching the filters or not
  hasMatch: function () {
    return !!this.findBy('matchFilters', true);
  }.property('@each.matchFilters').readOnly(),

  actions: {
    // used in the table headers to sort
    toggleSort: function (name) {
      name = '-' + name;
      if (this.get('sortProperties.firstObject') === name) {
        this.toggleProperty('sortAscending');
      }
      else {
        this.setProperties({
          sortProperties: [name],
          sortAscending:  true
        });
      }
    }
  }
});

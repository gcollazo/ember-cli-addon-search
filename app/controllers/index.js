import Ember from 'ember';

export var SORT_PROPERTIES_MAP = {
  name:      'sanitizedName',
  author:    'sanitizedAuthorName',
  modified:  'sanitizedModifiedAt',
  downloads: 'sanitizedDownloadCount'
};

export var DEFAULT_SORT_ASCENDING = {
  sanitizedName:   true,
  sanitizedAuthorName: true
};

export function sortCodeForProperty(property) {
  for (var k in SORT_PROPERTIES_MAP) {
    if (SORT_PROPERTIES_MAP[k] === property) {
      return k;
    }
  }
  return 'name';
}

var IndexController = Ember.ArrayController.extend({
  itemController: 'package',
  sortProperties: ['sanitizedName'],
  sortAscending:  true,
  queryParams:    ['query', 'order'],

  query: null,

  order: function (key, value) {
    var m, asc = true, prop;
    if (arguments.length > 1) {
      m = (value || '').split(':');
      if (m.length > 1) {
        asc = m.pop() !== 'desc';
      }
      prop = m.shift();
      if (!(prop in SORT_PROPERTIES_MAP)) {
        prop = 'name';
      }
      prop = SORT_PROPERTIES_MAP[prop];
      this.setProperties({
        sortProperties: [prop],
        sortAscending:  asc
      });
    }
    else {
      prop = this.get('sortProperties.firstObject');
      asc = this.get('sortAscending');
    }
    return sortCodeForProperty(prop) + (asc ? '' : ':desc');
  }.property('sortAscending', 'sortProperties.@each'),

  actions: {
    toggleSort: function (property) {
      var current = this.get('sortProperties.firstObject');
      var prop = SORT_PROPERTIES_MAP[property] || 'sanitizedName';
      if (prop === current) {
        this.toggleProperty('sortAscending');
      }
      else {
        this.setProperties({
          sortProperties: [prop],
          sortAscending:  DEFAULT_SORT_ASCENDING[prop] || false
        });
      }
    }
  }
});

export default IndexController;

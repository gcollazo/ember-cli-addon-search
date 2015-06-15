/*global Sifter*/
import Ember from 'ember';

// Based on https://github.com/lazybensch/ember-cli-filter-by-query
// Temporary fix until a fix lands for issue #5
const filterByQuery = function(array, propertyKeys, query, opt) {
  let options = opt,
    input, sifter, result, hash;

  if (!query) {
    return array;
  }

  if (Ember.typeOf(options) === 'undefined') {
    options = {};
  }

  input = array.map(function(item) {
    hash = {};

    propertyKeys.forEach(function(key) {
      hash[key] = Ember.get(item, key);
    });

    return hash;
  });

  options.fields = options.fields || propertyKeys;
  options.limit = options.limit || array.length;
  options.sort = propertyKeys.map(function(key) {
    return {field: key, direction: 'asc'};
  });

  sifter = new Sifter(input);
  result = sifter.search(query, options);

  return result.items.map(function(item) {
    return array.objectAt(item.id);
  });

};

export default function computedFilterByQuery(dependentKey, propertyKeys, queryKey, options) {
  const propertyKeysArray = Ember.makeArray(propertyKeys);

  return Ember.computed(queryKey, `${ dependentKey }.@each.{${ propertyKeysArray.join(',') }}`, function() {
    let query = this.get(queryKey) || '';
    let array = this.get(dependentKey);

    return filterByQuery(array, propertyKeys, query, options);

  });
}

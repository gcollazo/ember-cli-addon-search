import Ember from 'ember';
import filterByQuery from 'ember-cli-filter-by-query/util/filter';

export default function computedFilterByQuery(dependentKey, propertyKeys, queryKey, options) {
  let propertyKeysArray = Ember.makeArray(propertyKeys), array, query;

  return Ember.computed(queryKey, `${ dependentKey }.@each.{${ propertyKeysArray.join(',') }}`, function() {
    query = this.get(queryKey) || '';
    array = this.get(dependentKey);

    return filterByQuery(array, propertyKeys, query, options);

  });
}

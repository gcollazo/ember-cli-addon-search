import Ember from 'ember';
import filterByQuery from 'ember-cli-filter-by-query/util/filter';

export default function computedFilterByQuery(dependentKey, propertyKeys, queryKey, options) {
  const propertyKeysArray = Ember.makeArray(propertyKeys);

  return Ember.computed(queryKey, `${ dependentKey }.@each.{${ propertyKeysArray.join(',') }}`, function() {
    let query = this.get(queryKey) || '';
    let array = this.get(dependentKey);

    return filterByQuery(array, propertyKeys, query, options);

  });
}

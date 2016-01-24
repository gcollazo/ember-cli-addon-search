import Ember from 'ember';

export function digitGrouping(value) {
  return parseFloat(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default Ember.Helper.helper(digitGrouping);

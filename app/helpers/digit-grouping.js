import Ember from 'ember';

function digitGrouping(value) {
  value = parseFloat(value);
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export {
  digitGrouping
};

export default Ember.Handlebars.makeBoundHelper(digitGrouping);

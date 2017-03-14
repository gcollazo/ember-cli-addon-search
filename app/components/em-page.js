import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'table',
  classNames: 'table table-packages',

  actions: {
    sortBy(...args) {
      this.sortBy(...args);
    }
  }
});

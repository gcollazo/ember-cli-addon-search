import Component from '@ember/component';

export default Component.extend({
  tagName: 'table',
  classNames: 'table table-packages',

  actions: {
    sortBy(...args) {
      this.sortBy(...args);
    }
  }
});

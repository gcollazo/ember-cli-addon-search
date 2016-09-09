import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'header',

  placeholder: computed('packageCount', function() {
    return `Search ${this.get('packageCount')} addons`;
  }),

  actions: {
    resetPageCount() {
      this.sendAction('reset-page');
    }
  }
});

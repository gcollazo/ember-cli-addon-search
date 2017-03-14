import Ember from 'ember';

const {
  Controller,
  computed: { readOnly }
} = Ember;

const SCROLL_TO_POSITION = 0;

export default Controller.extend({
  queryParams: ['query', 'page'],

  query: '',
  page: 1,
  limit: 12,
  packageCount: readOnly('model.length'),

  actions: {
    resetPage() {
      this.set('page', 1);
    },
    nextPage() {
      this.incrementProperty('page');
      window.scrollTo(0, SCROLL_TO_POSITION);
    },

    previousPage() {
      this.decrementProperty('page');
      window.scrollTo(0, SCROLL_TO_POSITION);
    }
  }
});

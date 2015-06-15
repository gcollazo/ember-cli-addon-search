import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['pagination-row'],

  page: 1,
  limit: 12,
  list: [],

  didInsertElement() {
    Ember.$(document).on('keyup', event => {
      this.onGlobalKeyUp(event);
    });
  },

  willDestroyElement() {
    Ember.$(document).off('keyup');
  },

  onGlobalKeyUp(event) {
    const key = event.keyCode;
    const tag = event.target.tagName.toLowerCase();

    if (tag === 'input') {
      return;
    }

    switch (key) {
      case 37:
        this.get('controller').send('previousPage');
        break;
      case 39:
        this.get('controller').send('nextPage');
        break;
    }
  },

  hasPreviousPage: Ember.computed('page', function() {
    return this.get('page') !== 1;
  }).readOnly(),

  hasNextPage: Ember.computed('page', 'limit', 'list.length', function() {
    const page = this.get('page');
    const limit = this.get('limit');
    const length = this.get('list.length');

    return page * limit < length;
  }).readOnly(),

  actions: {
    nextPage: function() {
      if (this.get('hasNextPage')) {
        this.sendAction('next');
      }
    },

    previousPage: function() {
      if (this.get('hasPreviousPage')) {
        this.sendAction('previous');
      }
    }
  }
});

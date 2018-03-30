import $ from 'jquery';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['pagination-row'],

  page: 1,
  limit: 12,
  list: [],

  didInsertElement() {
    this._super(...arguments);
    $(document).on('keyup', (event) => {
      this.onGlobalKeyUp(event);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    $(document).off('keyup');
  },

  onGlobalKeyUp(event) {
    const key = event.keyCode;
    const tag = event.target.tagName.toLowerCase();

    if (tag === 'input') {
      return;
    }

    switch (key) {
      case 37:
        this.send('previousPage');
        break;
      case 39:
        this.send('nextPage');
        break;
    }
  },

  hasPreviousPage: computed('page', function() {
    return this.get('page') !== 1;
  }).readOnly(),

  hasNextPage: computed('page', 'limit', 'list.length', function() {
    const page = this.get('page');
    const limit = this.get('limit');
    const length = this.get('list.length');

    return page * limit < length;
  }).readOnly(),

  actions: {
    nextPage() {
      if (this.get('hasNextPage')) {
        this.sendAction('next');
      }
    },

    previousPage() {
      if (this.get('hasPreviousPage')) {
        this.sendAction('previous');
      }
    }
  }
});

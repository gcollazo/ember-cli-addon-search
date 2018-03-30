import Component from '@ember/component';
import { computed } from '@ember/object';

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

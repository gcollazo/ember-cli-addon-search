import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['clipboard'],

  click() {
    this.$('[data-toggle="tooltip"]')
      .attr('data-original-title', 'Copied!').tooltip('show');
  },

  mouseEnter() {
    this.$('[data-toggle="tooltip"]')
      .attr('data-original-title', 'Copy Install Command').tooltip('show');
  }
});

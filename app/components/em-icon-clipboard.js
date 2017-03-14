import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['clipboard'],

  mouseEnter() {
    this._showToolip('Copy Install Command');
  },

  actions: {
    success() {
      this._showToolip('Copied!');
    },

    error() {
      this._showToolip('Error :(');
    }
  },

  _showToolip(text) {
    this.$('[data-toggle="tooltip"]')
      .attr('data-original-title', text).tooltip('show');
  }
});

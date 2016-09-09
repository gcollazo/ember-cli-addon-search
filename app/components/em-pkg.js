import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'tr',
  classNames: ['package'],

  downloads: computed.readOnly('pkg.downloads.downloads'),
  user: computed.readOnly('pkg._npmUser'),
  hideInstallCommand: true,

  installCommand: computed('pkg.name', function() {
    return `ember install ${this.get('pkg.name')}`;
  }),

  isNew: computed('pkg.time.created', function() {
    return moment().diff(this.get('pkg.time.created'), 'days') <= 7;
  }).readOnly(),

  hasDescription: computed('pkg.description', function() {
    const defaultString = 'The default blueprint for ember-cli addons.';
    return this.get('pkg.description') !== defaultString;
  }).readOnly()
});

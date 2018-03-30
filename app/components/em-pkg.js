import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  tagName: 'tr',
  classNames: ['package'],

  downloads: readOnly('pkg.downloads.downloads'),
  user: readOnly('pkg._npmUser'),
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

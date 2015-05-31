import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['package'],

  downloads: Ember.computed.readOnly('pkg.downloads.downloads'),
  user: Ember.computed.readOnly('pkg._npmUser'),

  isNew: Ember.computed('pkg.time.created', function() {
    return moment().diff(this.get('pkg.time.created'), 'days') <= 7;
  }).readOnly(),

  hasDescription: Ember.computed('pkg.description', function() {
    return this.get('pkg.description') !== 'The default blueprint for ember-cli addons.';
  }).readOnly()

});

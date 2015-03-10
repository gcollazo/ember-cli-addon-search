import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['package'],

  downloads: Ember.computed.readOnly('pkg.downloads.downloads'),
  user: Ember.computed.readOnly('pkg._npmUser'),

  isNew: function () {
    return moment().diff(this.get('pkg.time.created'), 'days') <= 7;
  }.property('pkg.time.created').readOnly()

});

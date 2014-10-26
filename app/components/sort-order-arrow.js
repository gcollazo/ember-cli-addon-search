import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  subject: null,
  name:    null,

  isSorted: function () {
    return (this.get('subject.sortProperties') || []).indexOf(this.get('name')) >= 0;
  }.property('subject.sortProperties.@each').readOnly(),

  isAscending: Ember.computed.oneWay('subject.sortAscending')
});

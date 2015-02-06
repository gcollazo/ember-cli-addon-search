import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  visible: false,

  updateVisible: function() {
    Ember.run.later(this, function() {
      if (Ember.$('tr.visible').length <= 0) {
        this.set('visible', true);
      } else {
        this.set('visible', false);
      }
    });
  }.observes('signal'),

  updateOnInsert: function() {
    this.updateVisible();
  }.on('didInsertElement')
});

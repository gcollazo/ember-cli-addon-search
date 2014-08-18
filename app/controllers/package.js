import Ember from 'ember';

export default Ember.ObjectController.extend({
  npmLink: function() {
    return 'https://www.npmjs.org/package/' + this.get('name');
  }.property()
});

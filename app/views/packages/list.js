import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    var view = this,
        searchField = Ember.$('.search-field');

    Ember.$(document).on('keyup', function(event) {
      view.onGlobalKeyUp(event, searchField);
    });
  },

  willDestroyElement: function() {
    Ember.$(document).off('keyup');
  },

  onGlobalKeyUp: function(event, searchField) {
    var key = event.keyCode,
        searchNotFocused = !searchField.is(':focus');

    if (searchNotFocused && key === 37) {
      this.get('controller').send('previousPage');
    } else if (searchNotFocused && key === 39) {
      this.get('controller').send('nextPage');
    }
  }
});

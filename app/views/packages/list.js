import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    var view = this;
    var searchField = Ember.$('.search-field');

    Ember.$(document).on('keyup', function(event) {
      view.onGlobalKeyUp(event, searchField);
    });
  },

  willDestroyElement: function() {
    Ember.$(document).off('keyup');
  },

  onGlobalKeyUp: function(event, searchField) {
    var key = event.keyCode;
    var searchFieldNotFocused = !searchField.is(':focus');

    if (searchFieldNotFocused && key === 37) {
      this.get('controller').send('previousPage');

    } else if (searchFieldNotFocused && key === 39) {
      this.get('controller').send('nextPage');
    }
  }
});

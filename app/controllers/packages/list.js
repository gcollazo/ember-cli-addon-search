import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query'],

  actions: {
    sortByName: function(reverse) {
      var sorted =  this.get('model').sortBy('name');
      if (reverse) { sorted.reverse(); }
      this.set('model', sorted);
    },

    sortByOwner: function(reverse) {
      var sorted = this.get('model').sortBy('_npmUser.name');
      if (reverse) { sorted.reverse(); }
      this.set('model', sorted);
    },

    sortByDownloads: function(reverse) {
      var sorted = this.get('model').sortBy('downloads.downloads');
      if (reverse) { sorted.reverse(); }
      this.set('model', sorted);
    },

    sortByUpdated: function(reverse) {
      var sorted = this.get('model').sortBy('time.modified');
      if (reverse) { sorted.reverse(); }
      this.set('model', sorted);
    }
  }
});

import Ember from 'ember';

export default Ember.ObjectController.extend({
  matchFilters: function () {
    var query = (this.get('parentController.query') || '').trim().toLowerCase();
    return !query ||
      this.get('sanitizedName').indexOf(query) >= 0 ||
      this.get('sanitizedDescription').indexOf(query) >= 0 ||
      this.get('sanitizedAuthorName').indexOf(query) >= 0;
  }.property(
    'parentController.query', 'sanitizedName', 'sanitizedDescription', 'sanitizedAuthorName'
  ).readOnly()
});

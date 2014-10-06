import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['query'],

  packageCount: function() {
    return this.get('content').length;
  }.property('content'),

  filteredContent: function() {
    var searchTerm = this.get('query');

    if (searchTerm) {
      return this.get('content').filter(function(item) {
        var query = searchTerm.toLowerCase(),
            name = (item.name || '').toLowerCase(),
            desc = (item.description || '').toLowerCase(),
            author = (item._npmUser.name || '').toLowerCase();

        return name.match(query) || desc.match(query) || author.match(query);
      });
    }
    return this.get('content');
  }.property('query')
});

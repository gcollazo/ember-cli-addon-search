import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams:['query'],

  packageCount: function() {
    return this.get('content').length;
  }.property('content'),

  filteredContent: function() {
    var self = this;

    if (this.get('query')) {
      return this.get('content').filter(function(item) {
        var query = self.get('query').toLowerCase(),
            name = (item.name || '').toLowerCase(),
            desc = (item.doc.description || '').toLowerCase(),
            author = (item.doc._npmUser.name || '').toLowerCase();

        return name.match(query) || desc.match(query) || author.match(query);
      });
    }
    return this.get('content');
  }.property('query')
});

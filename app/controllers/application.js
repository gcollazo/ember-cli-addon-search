import Ember from 'ember';

export default Ember.ArrayController.extend({
  packageCount: function() {
    return this.get('content').length;
  }.property('content'),

  filteredContent: function() {
    var self = this;

    if (this.get('query')) {
      return this.get('content').filter(function(item) {
        var query = self.get('query').toLowerCase(),
            name = (item.get('name') || '').toLowerCase(),
            desc = (item.get('description') || '').toLowerCase();

        return name.match(query) || desc.match(query);
      });
    }
    return this.get('content');
  }.property('query')
});

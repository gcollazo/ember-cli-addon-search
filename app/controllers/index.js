import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['query'],

  packageCount: Ember.computed.readOnly('content.length'),

  filteredContent: function() {
    var controller = this;

    if (this.get('query')) {
      return this.get('content').filter(function(item) {
        var query = controller.get('query').toLowerCase(),
            name = (item.name || '').toLowerCase(),
            desc = (item.doc.description || '').toLowerCase(),
            author = (item.doc._npmUser.name || '').toLowerCase();

        return name.match(query) || desc.match(query) || author.match(query);
      });
    }
    return this.get('content');
  }.property('query').readOnly()
});

import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['query'],

  init: function() {
    this._filteredArray = [];
    this._super();
  },
  packageCount: Ember.computed.readOnly('content.length'),

  updateQueryParam: function() {
    this.set('queryProxy', this.get('query'));
  }.observes('query'),

  filteredContent: function() {
    var controller = this;

    // Update the query param
    Ember.run.debounce(this, function(){
      this.set('query', this.get('queryProxy'));
    }, 1000);

    var count = 0;
    var filtered = this._filteredArray;
    var content = this.get('content');

    content.forEach(function(item) {
      var query = controller.get('queryProxy');
      var name = (item.name || '').toLowerCase();
      var desc = (item.description || '').toLowerCase();
      var author = (item._npmUser.name || '').toLowerCase();

      if (query) {
        query = query.toLowerCase();
      }

      if (!query || name.match(query) || desc.match(query) || author.match(query)) {
        filtered.addObject(item);
      } else {
        filtered.removeObject(item);
      }
      count++;
    });

    return filtered;
  }.property('queryProxy').readOnly()
});

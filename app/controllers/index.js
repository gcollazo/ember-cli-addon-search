import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['query'],
  timer: null,

  init: function() {
    this._filteredArray = [];
    this._super();
  },
  packageCount: Ember.computed.readOnly('content.length'),

  queryValueChanged: function() {
    var controller = this;
    var timer = this.get('timer');

    if (timer !== null) {
      // reset timer
      window.clearTimeout(timer);
    }

    // schedule a query param update for later
    this.set('timer', setTimeout(function updateQueryParam() {
      controller.set('query', controller.get('queryValue'));
    }, 600));
  }.observes('queryValue'),

  queryChanged: function() {
    this.set('queryValue', this.get('query'));
  }.observes('query'),

  filteredContent: function() {
    var controller = this;

    var count = 0;
    var filtered = this._filteredArray;
    var content = this.get('content');

    content.forEach(function(item) {
      var query = controller.get('queryValue');

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
  }.property('queryValue').readOnly(),
});

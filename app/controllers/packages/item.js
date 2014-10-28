import Ember from 'ember';

export default Ember.ObjectController.extend({
  matchFilters: function(){
    var query = (this.get('parentController.query') || '').trim().toLowerCase();
    return !query ||
      this.get('-name').indexOf(query) >= 0 ||
      this.get('-owner').indexOf(query) >= 0 ||
      this.get('-description').indexOf(query) >= 0;
  }.property('-name', '-owner', '-description', 'parentController.query').readOnly()
});

import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function(store, type, payload) {
    var id = 1;
    var packages = payload.map(function(p) {
      p.id = id++;
      return p;
    });

    payload = {packages: payload};
    return this._super(store, type, payload);
  }
});
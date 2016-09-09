import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeArrayResponse: function(store, type, payload) {
    let id = 1;
    const packages = payload.map(function(p) {
      p.id = id++;
      return p;
    });

    payload = { packages: packages };

    return this._super(store, type, payload);
  }
});

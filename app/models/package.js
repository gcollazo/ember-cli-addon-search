import DS from 'ember-data';
var attr = DS.attr;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  time: attr(),
  author: attr(),
  github: attr(),
  _npmUser: attr(),
  downloads: attr(),
  emberObserver: attr()
});
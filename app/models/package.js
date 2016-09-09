import DS from 'ember-data';
const attr = DS.attr;

export default DS.Model.extend({
  _npmUser: attr(),
  author: attr(),
  demoURL: attr('string'),
  description: attr('string'),
  downloads: attr(),
  emberObserver: attr(),
  github: attr(),
  name: attr('string'),
  time: attr()
});

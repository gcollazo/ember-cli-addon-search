import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  _npmUser: attr(),
  author: attr(),
  demoURL: attr(),
  description: attr(),
  downloads: attr(),
  emberObserver: attr(),
  github: attr(),
  name: attr(),
  time: attr()
});

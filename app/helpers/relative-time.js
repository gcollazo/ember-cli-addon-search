/* global moment */
import Ember from 'ember';

function relativeTime(value) {
  return moment(value).fromNow();
}

export {
  relativeTime
};

export default Ember.Handlebars.makeBoundHelper(relativeTime);

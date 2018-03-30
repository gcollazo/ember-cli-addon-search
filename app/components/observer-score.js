import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  computedScore: computed('score', function() {
    const score = this.get('score');
    if (score === -2) {
      return '-';
    } else if (score === -1) {
      return 'WIP';
    } else {
      return score;
    }
  })
});

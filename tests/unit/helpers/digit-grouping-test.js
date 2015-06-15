import { digitGrouping } from '../../../helpers/digit-grouping';
import { module, test } from 'qunit';

module('Unit | Helper | digit grouping');

test('it works', function(assert) {
  var result = digitGrouping(1234567);

  assert.equal(result, '1,234,567');
});

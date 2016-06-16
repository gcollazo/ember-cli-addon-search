import { splitPrefix } from '../../../helpers/split-prefix';
import { module, test } from 'qunit';

module('Unit | Helper | split prefix');

test('it works', function(assert) {
  var result = splitPrefix(['ember-cli-testing']);

  assert.equal(result.toString(), '<span class="name-prefix">ember-cli-</span><span class="name-main">testing</span>');
});

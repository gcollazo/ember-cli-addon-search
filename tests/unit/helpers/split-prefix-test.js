import {
  splitPrefix
} from 'ember-cli-addon-search/helpers/split-prefix';

module('SplitPrefixHelper');

test('It splits out ember-', function() {
  var result = splitPrefix('ember-thisisatest');
  equal(result, '<span class="name-prefix">ember-</span><span class="name-main">thisisatest</span>');
});

test('It splits out ember-cli-', function() {
  var result = splitPrefix('ember-cli-thisisatest');
  equal(result, '<span class="name-prefix">ember-cli-</span><span class="name-main">thisisatest</span>');
});

test('It handles names with hyphens', function() {
  var result = splitPrefix('ember-cli-this-is-a-test');
  equal(result, '<span class="name-prefix">ember-cli-</span><span class="name-main">this-is-a-test</span>');
});
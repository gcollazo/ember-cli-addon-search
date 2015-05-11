import Ember from 'ember';

var NAME_REGEX = /^(ember\-cli\-|ember\-)(.+)/;

function splitPrefix(value) {
  if ((typeof value) !== 'string') {
    return;
  }
  var parts = value.match(NAME_REGEX);

  if (!parts) {
    return value;
  }

  var prefix = parts[1];
  var name = Ember.Handlebars.Utils.escapeExpression(parts[2]);

  return new Ember.Handlebars.SafeString('<span class="name-prefix">' + prefix + '</span><span class="name-main">' + name + '</span>');
}

export {
  splitPrefix
};

export default Ember.Handlebars.makeBoundHelper(splitPrefix);

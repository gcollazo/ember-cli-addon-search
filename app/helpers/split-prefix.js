import Ember from 'ember';

const NAME_REGEX = /^(ember\-cli\-|ember\-)(.+)/;

export function splitPrefix(value) {
  if ((typeof value) !== 'string') {
    return null;
  }

  const parts = value.match(NAME_REGEX);

  if (!parts) {
    return value;
  }

  const prefix = parts[1];
  const name = Ember.Handlebars.Utils.escapeExpression(parts[2]);

  return new Ember.Handlebars.SafeString('<span class="name-prefix">' + prefix + '</span><span class="name-main">' + name + '</span>');
}

export default Ember.Handlebars.makeBoundHelper(splitPrefix);

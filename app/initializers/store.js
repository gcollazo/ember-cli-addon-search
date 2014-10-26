import Package from '../models/package';
import NpmUser from '../models/npm-user';
import GithubUser from '../models/github-user';
import GithubRepo from '../models/github-repo';
import Store from '../store';

export var initialize = function (container, application) {
  container.register('store:main', Store, { singleton: true });
  container.register('model:package', Package, { singleton: false });
  container.register('model:npm-user', NpmUser, { singleton: false });
  container.register('model:github-user', GithubUser, { singleton: false });
  container.register('model:github-repo', GithubRepo, { singleton: false });

  application.inject('route', 'store', 'store:main');
  application.inject('controller', 'store', 'store:main');
  application.inject('model', 'store', 'store:main');
};

export default {
  name: 'store',

  initialize: initialize
};

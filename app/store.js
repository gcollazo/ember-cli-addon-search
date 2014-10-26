import Ember from 'ember';
import ajax from 'ic-ajax';

function coerceId(id) {
  if (id) {
    return '' + id;
  }
  return null;
}

function date(dt) {
  if (!dt) {
    return null;
  }
  return new Date(dt);
}

export default Ember.Object.extend({
  /**
   * Source URL where to get the package list from
   * @property sourceUrl
   * @type String
   */
  sourceUrl: 'https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json',
  /**
   * Cache max age in milliseconds
   * @property maxAge
   * @type Number
   */
  maxAge:    1000 * 60 * 30,

  _since:        null,
  _ajaxPromise:  null,
  _recordsCache: null,

  /**
   * Get a model class for its name
   *
   * @method modelFor
   * @param {String} model
   * @returns {subclass of Ember.Object}
   */
  modelFor: function (model) {
    return this.container.lookupFactory('model:' + model);
  },

  /**
   * Returns the primary key of the model
   *
   * @method primaryKeyFor
   * @param {String} model
   * @returns {String}
   */
  primaryKeyFor: function (model) {
    return this.modelFor(model).primaryKey || 'name';
  },


  /**
   * Get or create a record for a given ID
   *
   * @method recordForId
   * @param {String} model
   * @param {String} id
   * @returns {Ember.Object}
   */
  recordForId: function (model, id) {
    var cache = this.get('_recordsCache');
    var cleanId = coerceId(id);
    var record, pk;
    if (!cache[model]) {
      cache[model] = Object.create(null);
    }
    if (!cache[model][cleanId]) {
      record = {};
      pk = this.primaryKeyFor(model);
      record[pk] = id;
      cache[model][cleanId] = this.modelFor(model).create(record);
    }
    return cache[model][cleanId];
  },

  /**
   * Finds whether a record exists for the given model and ID
   *
   * @method hasRecordForId
   * @param {String} model
   * @param {String} id
   * @returns {Boolean}
   */
  hasRecordForId: function (model, id) {
    var cache = this.get('_recordsCache');
    var cleanId = coerceId(id);
    return !!(cache[model] && cache[model][cleanId]);
  },

  /**
   * Create or update a records given the model name and properties
   *
   * @method createOrUpdateRecord
   * @param {String} model
   * @param {Object} data
   * @returns {Ember.Object}
   */
  createOrUpdateRecord: function (model, data) {
    var record;
    var pk = this.primaryKeyFor(model);
    var cleanId = coerceId(data[pk]);
    var cache = this._modelRecordsCache(model);
    if ((record = cache[cleanId])) {
      record.setProperties(data);
    }
    else {
      cache[cleanId] = record = this.modelFor(model).create(data);
    }
    return record;
  },

  /**
   * Creates a new record
   *
   * @method createRecord
   * @param {String} model
   * @param {Object} data
   * @returns {Ember.Object}
   */
  createRecord: function (model, data) {
    var record, pk = this.primaryKeyFor(model);
    if (this.hasRecordForId(model, data[pk])) {
      throw new Error('record of model %@ with id %@ already exists'.fmt(model, data[pk]));
    }
    record = this.modelFor(model).create(data);
    this._modelRecordsCache(model)[coerceId(data[pk])] = record;
    return record;
  },

  /**
   * Finds one Package record if there is one with the given name, or all package records if no name given
   *
   * @method find
   * @param {String} model
   * @param {String} [id]
   * @returns {Ember.RSVP.Promise}
   */
  find: function (model, id) {
    var pk = this.primaryKeyFor(model);
    return this._all(model)
      .then(function (content) {
        if (id) {
          return content.findBy(pk, id);
        }
        else {
          return content;
        }
      });
  },

  /**
   * Finds records base on a search query
   *
   * @method findQuery
   * @param {String} model
   * @param {Object} where
   * @returns {Ember.RSVP.Promise}
   */
  findQuery: function (model, where) {
    var filterFunc = function (item) {
      var val;
      for (var k in where) {
        val = where[k];
        if (item.get(k) !== val) {
          return false;
        }
      }
      return true;
    };
    return this._all(model)
      .then(function (content) {
        return content.filter(filterFunc);
      });
  },

  /**
   * Finds all records
   *
   * @method findALl
   * @param {String} model
   * @returns {Ember.RSVP.Promise}
   */
  findAll: function (model) {
    return this.find(model);
  },

  /**
   * Returns a promise resolving to an array of all packages as records
   * @method _all
   * @param {String} model
   * @returns {Ember.RSVP.Promise}
   * @private
   */
  _all: function (model) {
    var self = this, records, cache;
    if (this._ajaxPromise) {
      return this._ajaxPromise;
    }
    else if (!this._since || Date.now() - this._since > this.get('maxAge')) {
      return this._ajaxPromise = ajax(this.get('sourceUrl'))
        .then(function (results) {
          self._parse(results);
          self._since = Date.now();
          self._ajaxPromise = null;
          records = [];
          cache = self._recordsCache[model];
          for (var k in cache) {
            records.push(cache[k]);
          }
          return records;
        })
        .catch(function (error) {
          self._ajaxPromise = null;
          return error;
        });
    }
    return Ember.RSVP.resolve(this._data.content);
  },


  /**
   * Parse the JSON from the source URL
   *
   * @method _parse
   * @param {Array} content
   * @private
   */
  _parse: function (content) {
    var self = this, pkgRecord, repoRecord, userRecord;

    function parseNpmUser(user) {
      if (!user) {
        return null;
      }
      userRecord = {};
      userRecord.name = user.name;
      userRecord.email = user.email;
      userRecord.gravatarUrl = user.gravatar + '?s=30&d=retro';
      userRecord.profileUrl = 'https://npmjs.org/~' + user.name;
      return self.createOrUpdateRecord('npm-user', userRecord);
    }

    function parseGithubUser(user) {
      if (!user) {
        return null;
      }
      userRecord = {};
      userRecord.name = user.user;
      userRecord.profileUrl = 'https://github.com/' + user.user;
      return self.createOrUpdateRecord('github-user', userRecord);
    }

    function parseGithubRepo(repo) {
      if (!repo) {
        return null;
      }
      repoRecord = {};
      repoRecord.user = self.recordForId('github-user', repo.user);
      repoRecord.name = repo.user + '/' + repo.repo;
      repoRecord.url = 'https://github.com/' + repoRecord.name;
      repoRecord.travisBadgeUrl = 'https://travis-ci.org/' + repo.user + '/' + repo.repo + '.svg?branch=master';
      return self.createOrUpdateRecord('github-repo', repoRecord);
    }

    content.forEach(function (pkg) {
      pkgRecord = {};
      pkgRecord.name = pkg.name;
      pkgRecord.description = (pkg.description || '').trim();
      pkgRecord.createdAt = date(pkg.time.created);
      pkgRecord.modifiedAt = date(pkg.time.created);
      pkgRecord.homePageUrl = pkg.homepage.url;
      pkgRecord.keywords = pkg.keywords.without('ember-data');
      pkgRecord.repositoryUrl = pkg.repository.url;
      pkgRecord.authorName = pkg.author ? pkg.author.name : pkg._npmUser.name;
      pkgRecord.owner = parseNpmUser(pkg._npmUser);
      pkgRecord.githubUser = parseGithubUser(pkg.github);
      pkgRecord.githubRepo = parseGithubRepo(pkg.github);
      pkgRecord.license = pkg.license;
      pkgRecord.bugUrl = pkg.bugs.url;
      pkgRecord.starredCount = pkg.starred.length;
      pkgRecord.downloadedCount = pkg.downloads.downloads;
      pkgRecord.firstDownloadedAt = date(pkg.downloads.start);
      pkgRecord.lastDownloadedAt = date(pkg.downloads.end);
      pkgRecord.npmUrl = 'https://www.npmjs.org/package/' + pkg.name;

      self.createOrUpdateRecord('package', pkgRecord);
    });
  },

  /**
   * Get the records cache dict for a model
   *
   * @method _modelRecordsCache
   * @param {String} model
   * @returns {Object}
   * @private
   */
  _modelRecordsCache: function (model) {
    if (!this._recordsCache) {
      this._recordsCache = Object.create(null);
    }
    if (!this._recordsCache[model]) {
      this._recordsCache[model] = Object.create(null);
    }
    return this._recordsCache[model];
  }

});

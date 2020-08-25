const uid = require("uid2");

class InMemoryStore {
  _memoryStore = {};

  constructor() {
    this.clear();
  }

  save(req, data, cb) {
    const key = uid(8);

    return this.update(req, key, data, cb);
  }

  update(req, key, data, callback) {
    this._memoryStore[key] = data;

    if (callback) {
      callback(null, key);
    }
  }

  load(req, key, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }

    const result = this._memoryStore[key];

    if (options.destroy) {
      delete this._memoryStore[key];
    }

    callback(null, result);
  }

  clear(callback) {
    this._memoryStore = {};

    if (callback) {
      callback();
    }
  }
}

module.exports = InMemoryStore;

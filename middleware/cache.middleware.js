const dayjs = require('dayjs');

class Cache {
  cache = new Map();

  /**
   * @param {*} options
   */
  constructor(options) {

  }

  /**
   *
   * @param {String} key
   * @param {*} value
   * @param {Number} expire 单位是秒，0表示永不过期
   */
  set(key, value, expire = 0) {
    const expireTime = expire > 0? dayjs().add(expire,'s').valueOf() : 0;

    this.cache.set(key, { value, expireTime });
  }

  get(key) {
    const cacheItem = this.cache.get(key);

    if (cacheItem && cacheItem.expireTime > 0 && cacheItem.expireTime < dayjs().valueOf()) {
      this.cache.delete(key);
      return null;
    }

    return cacheItem? cacheItem.value : null;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  keys() {
    return Array.from(this.cache.keys());
  }



  values() {

    return Array.from(this.cache.values()).map(item => item.value);
  }


  entries() {
    return this.cache.entries();
  }

  size() {
    return this.cache.size;
  }



  has(key) {
    return this.cache.has(key);
  }


}

module.exports = new Cache();

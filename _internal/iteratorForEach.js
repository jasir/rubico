const isPromise = require('./isPromise')
const promiseAll = require('./promiseAll')
const always = require('./always')

/**
 * @name iteratorForEach
 *
 * @synopsis
 * ```coffeescript [specscript]
 * var T any,
 *   iterator Iterator<T>,
 *   callback T=>()
 *
 * iteratorForEach(iterator, callback) -> ()
 * ```
 *
 * @description
 * Call a callback for each item of an iterator. Return a promise if any executions are asynchronous.
 *
 * Note: iterator is consumed
 */
const iteratorForEach = function (iterator, callback) {
  const promises = []
  for (const item of iterator) {
    const operation = callback(item)
    if (isPromise(operation)) {
      promises.push(operation)
    }
  }
  return promises.length == 0 ? iterator : promiseAll(promises).then(always(iterator))
}

module.exports = iteratorForEach

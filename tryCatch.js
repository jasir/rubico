const isPromise = require('./_internal/isPromise')
const __ = require('./_internal/placeholder')
const curry3 = require('./_internal/curry3')
const catcherApply = require('./_internal/catcherApply')

/**
 * @name tryCatch
 *
 * @synopsis
 * ```coffeescript [specscript]
 * var args ...any,
 *   tryer ...args=>Promise|any,
 *   catcher (err Error, ...args)=>Promise|any
 *
 * tryCatch(tryer, catcher)(...args) -> Promise|any
 * ```
 *
 * @description
 * Try a tryer, catch with catcher. On error or rejected Promise, call the catcher with the error followed by any arguments to the tryer.
 *
 * Note: if the return value is to be used in a future computation, be sure to account for that in both the `tryer` and the `catcher`
 *
 * ```javascript [playground]
 * const errorThrower = tryCatch(
 *   message => {
 *     throw new Error(message)
 *   },
 *   (err, message) => {
 *     console.log(err)
 *     return `${message} from catcher`
 *   },
 * )
 *
 * console.log(errorThrower('hello')) // Error: hello
 *                                    // hello from catcher
 * ```
 */
const tryCatch = (tryer, catcher) => function tryCatcher(...args) {
  try {
    const result = tryer(...args)
    return isPromise(result)
      ? result.catch(curry3(catcherApply, catcher, __, args))
      : result
  } catch (err) {
    return catcher(err, ...args)
  }
}

module.exports = tryCatch
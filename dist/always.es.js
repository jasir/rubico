/**
 * rubico v1.6.30
 * https://github.com/a-synchronous/rubico
 * (c) 2019-2021 Richard Tong
 * rubico may be freely distributed under the MIT license.
 */

const always = value => function getter() { return value }

export default always

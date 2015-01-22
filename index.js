/**
 * exec-cmd <https://github.com/tunnckoCore/exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var asyncExecCmd = require('async-exec-cmd');
var hybridify = require('hybridify');

/**
 * Hybrid execute command via spawn
 *
 * **Example:**
 *
 * ```js
 * var exec = require('exec-cmd');
 * var promise = exec('echo', [
 *   'hello world'
 * ], function __cb(err, res) {
 *   // as usual
 * })
 * .then(function(res) {
 *   //=> res[0] is code
 *   //=> res[1] is stdout
 *   //=> res[1] === 'hello world'
 * })
 * .catch(function(err) {
 *   //=> null || undefined?
 * })
 * ```
 *
 * @name execCmd
 * @param  {String}          `<cmd>`
 * @param  {Array|Function}  `<args>`
 * @param  {Object|Function} `[opts]`
 * @param  {Function}        `[callback]`
 * @return {Promise}
 * @api public
 */
module.exports = hybridify(asyncExecCmd);

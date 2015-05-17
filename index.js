/*!
 * exec-cmd <https://github.com/hybridables/exec-cmd>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var asyncExecCmd = require('async-exec-cmd')
var hybridify = require('hybridify')

/**
 * > Hybrid execute command via spawn. Actually this is [hybridify wrapper][hybridify]
 * for [async-exec-cmd][async-exec-cmd], so for more detailed information
 * see [async-exec-cmd readme][async-exec-cmd]
 *
 * **Example**
 * > The command will directly output `"Hello world!"`, because `stdio: inherit`, so `res[0]` which
 * is the actual response of execution, will be empty string `''`.
 *
 * ```js
 * var run = require('exec-cmd')
 * var promise = run('echo "Hello world!"', {stdio: 'inherit'})
 *
 * promise
 * .then(function(res) {
 *   var stdout = res[0]
 *   var code = res[1]
 *   var buffer = res[2]
 *
 *   console.log(stdout, code, buffer)
 *   //=> '' 0 <Buffer >
 * })
 * .catch(console.error)
 * ```
 *
 * @name execCmd
 * @param  {String}          `<cmd>` command to execute
 * @param  {Array|Function}  `[args]` sub-commands or flags, you also can pass them to `cmd`
 * @param  {Object|Function} `[opts]` options to pass to cross-spawn and child_process.spawn
 * @param  {Function}        `[callback]` optional node style callback
 * @return {Promise}
 * @api public
 */
module.exports = hybridify(asyncExecCmd)

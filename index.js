/**
 * exec-cmd <https://github.com/tunnckoCore/exec-cmd>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var spawn = require('cross-spawn');
var Deferred = require('native-or-another');

module.exports = function execCmd(cmd, args, opts) {
  var stdout = new Buffer('');
  var stderr = new Buffer('');

  opts = opts || {};
  args = args || [];

  assert(typeof cmd === 'string', 'exec-cmd: `cmd` must be string');
  assert(Array.isArray(args), 'exec-cmd: `args` must be array');
  assert(typeof opts === 'object', 'exec-cmd: `opts` must be object');

  var defer = new Deferred();
  var cp = spawn(cmd, args, opts);

  cp.stdout.on('data', function indexOnSTDOUT(data) {
    stdout = Buffer.concat([stdout, data]);
  });

  cp.stderr.on('data', function indexOnSTDERR(data) {
    stderr = Buffer.concat([stderr, data]);
  });

  /* istanbul ignore next */
  cp.on('error', function indexOnError(err) {
    return defer.reject(err);
  });

  cp.on('close', function indexOnClose(code) {
    stdout = stdout.toString();
    stderr = stderr.toString();

    if (!code) {
      return defer.resolve(stdout);
    }

    return defer.reject(new CommandError({
      status: code,
      stdout: stdout,
      stderr: stderr,
      message: stderr.replace('\n' + code + '\n', ''),
      command: cmd + ' ' + args.join(' ')
    }));
  });

  defer.promise.cp = cp;
  return defer.promise;
}

function CommandError(opts) {
  this.name = 'CommandError';
  this.command = opts.command;
  this.message = opts.message;
  this.status = opts.status;
  this.stdout = opts.stdout;
  this.stderr = opts.stderr;
}

CommandError.prototype = new Error();
CommandError.prototype.constructor = CommandError;

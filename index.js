/**
 * exec-cmd <https://github.com/tunnckoCore/exec-cmd>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var spawn = require('cross-spawn');
var Promize = require('native-or-bluebird');

module.exports = function execCmd(cmd, args, opts) {
  var stdout = new Buffer('');
  var stderr = new Buffer('');

  opts = opts || {};
  args = args || [];

  assert(typeof cmd === 'string', 'exec-cmd: `cmd` must be string');
  assert(Array.isArray(args), 'exec-cmd: `args` must be array');
  assert(typeof opts === 'object', 'exec-cmd: `opts` must be object');

  var deferred = new PromiseDeferred();
  var cp = spawn(cmd, args, opts);

  cp.stdout.on('data', function indexOnSTDOUT(data) {
    stdout = Buffer.concat([stdout, data]);
  });
  cp.stderr.on('data', function indexOnSTDERR(data) {
    stderr = Buffer.concat([stderr, data]);
  });

  cp.on('error', function indexOnError(err) {
    return deferred.reject(err);
  });

  cp.on('close', function indexOnClose(code) {
    stdout = stdout.toString();
    stderr = stderr.toString();

    if (!code) {
      return deferred.resolve(stdout);
    }

    return deferred.reject(new CommandError({
      status: code,
      stdout: stdout,
      stderr: stderr,
      message: stderr.replace('\n' + code + '\n', ''),
      command: cmd + ' ' + args.join(' ')
    }));
  });

  deferred.promise.cp = cp;
  return deferred.promise;
}

function PromiseDeferred() {
  var resolve = null;
  var reject = null;
  var promise = new Promize(function() {
    resolve = arguments[0];
    reject = arguments[1];
  });
  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  };
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

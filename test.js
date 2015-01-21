/**
 * exec-cmd <https://github.com/tunnckoCore/exec-cmd>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var exec = require('./index');
var assert = require('assert');

var isWin = process.platform === 'win32';
var strictEqual = assert.strictEqual;
var notStrictEqual = assert.notStrictEqual;

describe('exec-cmd:', function() {
  describe('api', function() {
    it('should handle optional `args` and `options`', function(done) {
      var promise = exec('echo');
      strictEqual(typeof promise.then, 'function');
      done();
    });

    it('should handle optional `options`', function(done) {
      var promise = exec('echo', [
        'hello world'
      ])
      .then(function(stdout) {
        strictEqual(stdout.trim(), 'hello world');
        done();
      })
      .catch(function(stderr) {
        /* istanbul ignore next */
        notStrictEqual(stderr.trim(), 'hello world');
        /* istanbul ignore next */
        done();
      })
    });

    it('should be with hybrid api', function(done) {
      var promise = exec('echo', [
        'hello world'
      ], function(err, res) {
        assert(!err)
        strictEqual(res.trim(), 'hello world');
      })
      .then(function(stdout) {
        strictEqual(stdout.trim(), 'hello world');
        done();
      })
      .catch(function(stderr) {
        /* istanbul ignore next */
        notStrictEqual(stderr.trim(), 'hello world');
        /* istanbul ignore next */
        done();
      })
    });

    it('should pass args to node fixtures/hellow-world.js', function(done) {
      var promise = exec('node', [
        './fixtures/hello-world.js', 'hello world'
      ])
      .then(function(stdout) {
        strictEqual(stdout, 'hello world');
        done();
      })
      .catch(function(stderr) {
        /* istanbul ignore next */
        notStrictEqual(stderr, 'hello world');
        /* istanbul ignore next */
        notStrictEqual(stderr, '');
        /* istanbul ignore next */
        done(stderr);
      })
    });

    it('should give access to the underlying child process', function(done) {
      var promise = exec('echo');
      strictEqual(typeof promise.cp.kill, 'function');
      done();
    });

    it('should expand using PATH_EXT properly', function(done) {
      if (!isWin) {
        return done();
      }

      /* istanbul ignore next */
      var promise = exec(path.join(__dirname, 'fixtures/foo.bat')) // Should expand to foo.bat
        .then(function(stdout) {
          strictEqual(stdout, 'foo');
          done();
        })
        .catch(function(stderr) {
          notStrictEqual(stderr, 'foo');
          notStrictEqual(stderr, '');
          done(stderr);
        });
    });

    it('should handle multibyte properly', function(done) {
      var promise = exec('node', [
        path.join(__dirname, 'fixtures/multibyte')
      ])
      .then(function(stdout) {
        strictEqual(stdout, 'こんにちは');
        done();
      })
      .catch(function(stderr) {
        /* istanbul ignore next */
        notStrictEqual(stderr, 'こんにちは');
        /* istanbul ignore next */
        notStrictEqual(stderr, '');
        /* istanbul ignore next */
        done(stderr);
      });
    });

    it('should fail on error code != 0', function(done) {
      var promise = exec('node', [
        path.join(__dirname, 'fixtures/fail')
      ])
      .then(function(stdout) {
        /* istanbul ignore next */
        strictEqual(stdout, '');
        /* istanbul ignore next */
        done();
      })
      .catch(function(stderr) {
        strictEqual(stderr instanceof Error, true);
        strictEqual(stderr.name, 'CommandError');
        notStrictEqual(stderr, '');
        done();
      });
    });
  });
});

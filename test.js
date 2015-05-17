/*!
 * exec-cmd <https://github.com/hybridables/exec-cmd>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var path = require('path')
var test = require('assertit')
var execCmd = require('./index')

test('should handle optional `args` and `options`', function (done) {
  var promise = execCmd('echo')

  test.equal(typeof promise.then, 'function')
  test.equal(typeof promise.hybridify, 'function')
  done()
})

test('should handle optional `options`', function (done) {
  var promise = execCmd('echo', [
    'hello world'
  ])

  promise
  .then(function (res) {
    var stdout = res[0]
    var code = res[1]

    test.equal(code, 0)
    test.equal(stdout.trim(), 'hello world')
    done()
  })
})

test('should be hybrid', function (done) {
  var cnt = 0
  var promise = execCmd('echo', [
    'hello world'
  ], function (err, res) {
    var stdout = res[0]
    var code = res[1]

    test.ifError(err)
    test.equal(code, 0)
    test.equal(stdout.trim(), 'hello world')
    cnt++
  })

  promise
  .then(function (res) {
    var stdout = res[0]
    var code = res[1]

    test.equal(code, 0)
    test.equal(stdout.trim(), 'hello world')
    test.equal(cnt, 1)
    done()
  })
})

test('should pass args to `node fixtures/hello-world.js`', function (done) {
  var promise = execCmd('node', [
    './fixtures/hello-world.js', 'hello world'
  ])

  promise
  .then(function (res) {
    var stdout = res[0]
    var code = res[1]

    test.equal(code, 0)
    test.equal(stdout.trim(), 'hello world')
    done()
  })
})

test('should expand using PATH_EXT properly', function (done) {
  if (process.platform !== 'win32') {
    return done()
  }

  /* istanbul ignore next */
  execCmd(path.join(__dirname, 'fixtures/foo.bat'))
  .then(function (res) {
    var stdout = res[0]
    var code = res[1]

    test.equal(code, 0)
    test.equal(stdout.trim(), 'foo')
    done()
  })
})

test('should handle multibyte properly', function (done) {
  var promise = execCmd('node', [
    path.join(__dirname, 'fixtures/multibyte')
  ])

  promise
  .then(function (res) {
    var stdout = res[0]
    var code = res[1]

    test.equal(code, 0)
    test.equal(stdout, 'こんにちは')
    done()
  })
})

test('should fail on error code != 0', function (done) {
  var promise = execCmd('node', [
    path.join(__dirname, 'fixtures/fail')
  ])

  promise
  .catch(function (err) {
    test.ifError(!err)
    test.equal(err instanceof Error, true)
    test.equal(err.name, 'CommandError')
    done()
  })
})

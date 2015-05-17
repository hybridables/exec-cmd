# exec-cmd [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Flexible and cross-platform executing commands. Hybrid, Async and Promise API.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i exec-cmd --save
npm test
```


## API
> For more use-cases see the [tests](./test.js)

### [execCmd](./index.js#L46)
> Hybrid execute command via spawn. Actually this is [hybridify wrapper][hybridify] for [async-exec-cmd][async-exec-cmd], so for more detailed information see [async-exec-cmd readme][async-exec-cmd]

- `<cmd>` **{String}** command to execute
- `[args]` **{Array}** sub-commands or flags, you also can pass them to `cmd`
- `[opts]` **{Object}** options to pass to cross-spawn and child_process.spawn
- `[cb]` **{Function}** optional node style callback
- `returns` **{Promise}**

**Example:**
> The command will directly output `"Hello world!"`, because `stdio: inherit`, so `res[0]` which
is the actual response of execution, will be empty string `''`.

```js
var run = require('exec-cmd')
var promise = run('echo "Hello world!"', {stdio: 'inherit'})

promise
.then(function(res) {
  var stdout = res[0]
  var code = res[1]
  var buffer = res[2]

  console.log(stdout, code, buffer)
  //=> '' 0 <Buffer >
})
.catch(console.error)
```

**More advanced example**
> Say we want to install [bluebird][bluebird] as dev dependency and after that uninstall it.

```js
var run = require('exec-cmd');

run('npm install', ['--save-dev', 'bluebird'])
.then(function(arr) {
  var res = arr[0];
  var code = arr[1];
  var buffer = arr[2];

  console.log(res);
  //=> 'bluebird@2.9.3 node_modules/bluebird'

  // So we now want to uninstall it,
  // but we want to show response directly on console (stdout)
  return run('npm', ['uninstall', '--save-dev', 'bluebird'], {stdio: 'inherit'})
})
.then(function(arr) {
  // not need to console.log something,
  // it will directly output this
  //=> unbuild bluebird@2.9.3
})
.catch(console.error)
```


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/exec-cmd/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/exec-cmd
[npmjs-img]: https://img.shields.io/npm/v/exec-cmd.svg?label=exec-cmd

[license-url]: https://github.com/hybridables/exec-cmd/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/hybridables/exec-cmd
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/exec-cmd.svg

[travis-url]: https://travis-ci.org/hybridables/exec-cmd
[travis-img]: https://img.shields.io/travis/hybridables/exec-cmd.svg

[coveralls-url]: https://coveralls.io/r/hybridables/exec-cmd
[coveralls-img]: https://img.shields.io/coveralls/hybridables/exec-cmd.svg

[david-url]: https://david-dm.org/hybridables/exec-cmd
[david-img]: https://img.shields.io/david/hybridables/exec-cmd.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg

[hybridify]: https://github.com/hybridables/hybridify
[async-exec-cmd]: https://github.com/tunnckoCore/async-exec-cmd
[bluebird]: https://github.com/petkaantonov/bluebird
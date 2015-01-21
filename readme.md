## [![npm versi][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> Simple, fast and cross-platform executing commands (with child_process spawn) using Bluebird or Native Promise. **The package is [hybrid][hybridify] - with [hybridify][hybridify] api!**


## Install
```bash
$ npm install exec-cmd
$ npm test
```


## Usage
```js
var exec = require('exec-cmd');
var promise = exec('echo', [
  'hello world'
])
.then(function(stdout) {
  //=> 'hello world'
})
.catch(function(stderr) {
  //=> ''
})
```


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2015 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/exec-cmd
[npmjs-img]: https://img.shields.io/npm/v/exec-cmd.svg?style=flat&label=exec-cmd

[coveralls-url]: https://coveralls.io/r/tunnckoCore/exec-cmd?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/exec-cmd.svg?style=flat

[license-url]: https://github.com/tunnckoCore/exec-cmd/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/exec-cmd
[travis-img]: https://img.shields.io/travis/tunnckoCore/exec-cmd.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/exec-cmd
[daviddm-img]: https://img.shields.io/david/tunnckoCore/exec-cmd.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/exec-cmd/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), January 21, 2015_


[hybridify]: https://github.com/tunnckoCore/hybridify
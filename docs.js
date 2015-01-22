var apidocs = require('helper-apidocs');

var res = apidocs.sync('./index.js')
console.log(JSON.stringify([res],0,2));

var execCmd = require('./index');


function gitCloneExample() {
  var promise = execCmd('git', ['clone', 'git@github.com:tunnckoCore/week-seconds'], function(err, res) {
    console.log('from callback:');
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
  })
  .then(function(res) {
    console.log('from .then (promise):');
    console.log(res);
  })
  .catch(function(err) {
    console.log('from .catch (promise):');
    console.log(err);
  })
}


/**
 * Build command flags
 *
 * @param {String} `repository`
 * @param {String} `destination`
 * @param {String} `branch`
 * @param {Boolean} `ssh`
 * @return {Array}
 * @api private
 */
function buildCommand() {
  var argz = handleArguments(arguments);
  var url = argz.args[3] ? 'git@github.com:' : 'https://github.com/'
  url = url + argz.args[0] + '.git';

  var subCommand = ['clone', url];

  if (argz.args[1]) {subCommand.push(argz.args[1])}
  if (argz.args[2]) {
    subCommand.push('-b')
    subCommand.push(argz.args[2])
  }

  return [subCommand, argz.args[0], argz.args[1], argz.args[2]];
}

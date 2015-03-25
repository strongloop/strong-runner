var EventEmitter = require('events').EventEmitter;
var Runner = require('./runner');
var Stdio = require('../lib/stdio');
var util = require('util');

module.exports = App;

function App(options) {
  if (!(this instanceof App))
    return new App(options);

  EventEmitter.call(this);

  this.options = options = util._extend({
    console: console,
    // XXX(sam) for multi-app, may also need:
    //   name: app name
  });
  this.console = options.console;
  this.current = null;
  this.stdout = Stdio('stdout');
  this.stderr = Stdio('stderr');
}

util.inherits(App, EventEmitter);

// Run a commit, replacing the currently running commit, if it exists.
App.prototype.run = function run(commit) {
  var self = this;
  var current = self.current;

  self.console.log('Run request for commit %j on current %s', commit, current);

  if (current) {
    current.replace(commit);
    return current;
  }

  current = self.current = new Runner(commit, self.options);

  current.stdout.pipe(this.stdout, {end: false});
  current.stderr.pipe(this.stderr, {end: false});

  current.start();

  current.on('request', function(req, callback) {
    self.emit('request', req, callback);
  });

  return current;
};

// Stop the current commit, if it exists.
App.prototype.stop = function(callback) {
  var self = this;
  var current = self.current;

  console.log('Stop current %s', current || '(none)');

  if (!callback)
    callback = function() {};

  if (!current) {
    process.nextTick(callback);
    return null;
  }

  current.stop(function() {
    // FIXME verify this is safe at this time... it might be that we should wait
    // for child 'close', not exit, before unpiping. Actually, all the piping
    // will cause memory leaks, go through it all carefully to ensure cleanup.
    current.stdout.unpipe(self.stdout);
    current.stderr.unpipe(self.stderr);
    self.current = null;
    return callback();
  });

  return current;
};

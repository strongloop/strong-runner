'use strict';

var Runner = require('../').Runner;
var commit = require('./commit');
var debug = require('debug')('strong-runner:test');
var tap = require('./tap');

tap.test('basic construction', function(t) {
  var app = commit.app();
  var r = Runner(app);
  t.equal(r.console, console);
  t.equal(r.commit, app);
  t.equal(r.restartCount, 0);
  t.end();
});

tap.test('start and stop app', function(t) {
  var app = commit.app();
  var r = Runner(app, {start: 'sl-run --cluster=0 --no-profile'});

  t.plan(2);
  r.start();
  r.once('start', function() {
    debug('on start');
    r.stop();
    t.assert(true, 'started');
  });
  r.once('exit', function(reason) {
    t.equal(reason, 'SIGTERM', reason);
  });
});

tap.test('start and start app', function(t) {
  var app = commit.app();
  var r = Runner(app, {start: 'sl-run --cluster=0 --no-profile'});

  t.plan(3);
  r.start();

  var child = r.child;

  r.start();

  t.equal(r.child, child);

  r.once('start', function() {
    t.equal(r.child, child);
    r.stop();
  });
  r.once('exit', function(reason) {
    t.equal(reason, 'SIGTERM', reason);
  });
});

tap.test('start and wait for status', function(t) {
  var app = commit.app();
  var r = Runner(app, {start: 'sl-run --cluster=2 --profile'});
  var workers;

  t.plan(3);

  this.on('end', function() {
    r.stop();
  });

  r.start();
  r.on('request', function(req, callback) {
    debug('on request: %j', req);
    if (req.cmd == 'status' && req.workers.length == 2) {
      t.assert(true, 'workers started');
      workers = req.workers;
    }
    if (req.cmd == 'listening' && req.pid === workers[0].pid) {
      t.assert(true, 'worker 1 listening');
    }
    if (req.cmd == 'listening' && req.pid === workers[1].pid) {
      t.assert(true, 'worker 2 listening');
    }

    return callback();
  });
});

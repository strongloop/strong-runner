// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: strong-runner
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var App = require('../').App;
var byline = require('byline');
var commit = require('./commit');
var debug = require('debug')('strong-runner:test');
var helpers = require('./helpers');
var tap = require('./tap');

tap.test('stdio for workers', function(t) {
  var app = commit.app();

  var r = App({
    start: 'sl-run --cluster=0 --no-profile'
      + '  --no-timestamp-workers --no-timestamp-supervisor',
    console: helpers.tapFriendlyConsole,
  });

  var stdout = byline(r.stdout);
  var stderr = byline(r.stderr);

  stderr.on('data', function(line) {
    t.comment('stderr <%s>', line);
  });

  // HACK: this prevents the first line of TAP output being a plan, which is
  // interpretted by tap4j/Jenkins as a plan for the the parent test, not the
  // first subtest
  t.ok(app, 'commit.app');

  t.test('run app', function(tt) {
    debug('wait for run');
    r.run(app);
    tt.plan(1);
    watchFor(tt, /supervisor starting/);
  });

  t.test('stop app', function(tt) {
    debug('wait for stop');
    tt.plan(1);
    r.stop('soft', function(err) {
      debug('stopped: err? %s', err);
      tt.ifError(err, err || 'stop ok');
    });
  });

  t.test('start app', function(tt) {
    debug('wait for start');
    tt.plan(2);
    r.start(function(err) {
      debug('started: err? %s', err);
      tt.ifError(err, err || 'start ok');
    });
    watchFor(tt, /supervisor starting/);
  });

  function watchFor(t, rx) {
    var saw;
    stdout.on('data', watch);
    function watch(line) {
      if (saw) return;
      t.comment('is %s in <%s>', rx, line);
      if (!saw && rx.test(line)) {
        saw = true;
        stdout.removeListener('data', watch);
        debug('saw rx %s', rx);
        t.assert(true, 'saw rx ' + rx);
      }
    }
  }

  t.test('done', function(tt) {
    tt.plan(1);
    r.stop('hard', function(err) {
      debug('stopped: err? %s', err);
      tt.ifError(err, err || 'stop ok');
    });
  });

  t.end();
});

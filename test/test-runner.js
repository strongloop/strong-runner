// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: strong-runner
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var commit = require('./commit');
var tap = require('tap');
var Runner = require('../').Runner;

tap.test('create runner with no options', function(t) {
  var c = commit.app();
  var r = Runner(c);

  t.equal(r.options.start, 'sl-run --cluster=cpu --profile');
  t.assert(r.stdout);
  t.assert(r.stderr);
  t.equal(r.commit, c);
  t.end();
});

tap.test('create runner with options', function(t) {
  var options = {
    console: {},
    start: 'sl-run --no-profile',
    quiet: true,
  };
  var c = commit.app();
  var r = Runner(c, options);

  t.notEqual(r.options, options, 'options should not be set by value');
  t.deepEqual(r.options, options, 'options should be set from properties');
  t.end();
});

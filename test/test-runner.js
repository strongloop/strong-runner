'use strict';

var assert = require('assert');
var c2s = require('../').Runnable.toString;
var commit = require('./commit');
var debug = require('debug')('strong-runner:test');
var fs = require('fs');
var path = require('path');
var tap = require('tap');
var util = require('util');
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

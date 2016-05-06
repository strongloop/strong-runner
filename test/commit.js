// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: strong-runner
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var Runnable = require('../').Runnable;
var app = require('path').resolve(__dirname, 'app');
var app1 = require('path').resolve(__dirname, 'app1');
var debug = require('debug')('strong-runner:test');
var extend = require('util')._extend;

exports.app = function(options) {
  options = extend({dir: app, hash: 'APP-HASH'}, options);
  debug('create runnable: %j', options);
  return Runnable(options);
};

exports.app1 = function(options) {
  options = extend({dir: app1, hash: 'APP-1-HASH'}, options);
  debug('create runnable: %j', options);
  return Runnable(options);
};

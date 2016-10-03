// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: strong-runner
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var log = require('debug')('strong-runner:test:log');
var err = require('debug')('strong-runner:test:err');

exports.tapFriendlyConsole = {
  log: log,
  error: err,
};

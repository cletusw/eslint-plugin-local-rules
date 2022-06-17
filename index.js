/* eslint-env node */
'use strict';

var { requireUp } = require('./requireUp');
var { DEFAULT_EXTENSIONS } = require('./constants');

var config = requireUp('eslint-local-rules', DEFAULT_EXTENSIONS, __dirname);

if (!config) {
  throw new Error(
    'eslint-plugin-local-rules: ' +
      'Cannot find "eslint-local-rules{' +
      ['.js'].concat(exts.filter(Boolean)) +
      '} ' +
      'or eslint-local-rules/index.js (checked all ancestors of "' +
      __dirname +
      '").'
  );
}

if (config.rules) {
  module.exports = config;
} else {
  module.exports = {
    rules: config,
  };
}

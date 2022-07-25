/* eslint-env node */
'use strict';

var { requireUp } = require('./requireUp');
var { DEFAULT_EXTENSIONS } = require('./constants');

var rules = requireUp('eslint-local-rules', DEFAULT_EXTENSIONS, __dirname);

if (!rules) {
  throw new Error(
    'eslint-plugin-local-rules: ' +
      'Cannot find "eslint-local-rules{' +
      ['.js'].concat(DEFAULT_EXTENSIONS.filter(Boolean)) +
      '} ' +
      'or eslint-local-rules/index.js (checked all ancestors of "' +
      __dirname +
      '").'
  );
}

module.exports = {
  rules: rules,
};

/* eslint-env node */
'use strict';

var { requireUp } = require('./requireUp');
var { DEFAULT_EXTENSIONS } = require('./constants');

// First check for local rules in the current working directory and its ancestors (enables npm/yarn/pnpm workspaces support)
var rules = requireUp('eslint-local-rules', DEFAULT_EXTENSIONS, process.cwd());

if (!rules) {
  // Then try the directory containing this plugin and its ancestors
  rules = requireUp('eslint-local-rules', DEFAULT_EXTENSIONS, __dirname);
}

if (!rules) {
  throw new Error(
    'eslint-plugin-local-rules: ' +
      'Cannot find "eslint-local-rules{' +
      ['.js'].concat(DEFAULT_EXTENSIONS.filter(Boolean)) +
      '} ' +
      'or eslint-local-rules/index.js (checked all ancestors of "' +
      process.cwd() +
      '" and "' +
      __dirname +
      '").'
  );
}

module.exports = {
  rules: rules,
};

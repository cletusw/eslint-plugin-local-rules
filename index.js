/* eslint-env node */
'use strict';

var { requireUp } = require('./requireUp');

// Empty extension takes advantage of Node's default require behavior to check for
// eslint-local-rules.js as well as an eslint-local-rules folder with an index.js
var exts = ['', '.cjs'];
var rules = requireUp('eslint-local-rules', exts, __dirname);

if (!rules) {
  throw new Error(
    'eslint-plugin-local-rules: ' +
    'Cannot find "eslint-local-rules{' + ['.js'].concat(exts.filter(Boolean)) + "} " +
    'or eslint-local-rules/index.js (checked all ancestors of "' + __dirname + '").'
  );
}

module.exports = {
  rules: rules,
};

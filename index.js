/* eslint-env node */
'use strict';

var path = require('path');

// Empty extension takes advantage of Node's default require behavior to check for
// eslint-local-rules.js as well as an eslint-local-rules folder with an index.js
var exts = ['', '.cjs'];
var rules = requireUp('eslint-local-rules', __dirname);

if (!rules) {
  throw new Error(
    'eslint-plugin-local-rules: ' +
    'Cannot find "eslint-local-rules.{' + exts.join(',') + "}" +
    '(looking up from "' + __dirname + '").'
  );
}

module.exports = {
  rules: rules,
};

// Attempt to require a file, recursively checking parent directories until found
// Similar to native `require` behavior, but doesn't check in `node_modules` folders
// Based on https://github.com/js-cli/node-findup-sync
function requireUp(filename, cwd) {
  var filepath = path.resolve(cwd, filename);

  for (var i = 0; i < exts.length; i++) {
    try {
      return require(filepath + exts[i]);
    } catch(error) {
      // Ignore OS errors (will recurse to parent directory)
      if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
      }
    }
  }

  var dir = path.dirname(cwd);
  if (dir === cwd) {
    return undefined;
  }

  return requireUp(filename, dir);
}

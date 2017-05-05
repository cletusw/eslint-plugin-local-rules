/* eslint-env node */
'use strict';

var path = require('path');

var rules = requireUp('eslint-local-rules.js');

module.exports = {
  rules: rules,
};

// Attempt to require a file, recursively checking parent directories until found
// Similar to native `require` behavior, but doesn't check in `node_modules` folders
// Based on https://github.com/js-cli/node-findup-sync
function requireUp(filename, cwd) {
  cwd = cwd || process.cwd();
  var filepath = path.resolve(cwd, filename);

  try {
    return require(filepath);
  } catch(error) {
    // Ignore (will recurse to parent directory)
  }

  var dir = path.dirname(cwd);
  if (dir === cwd) {
    return undefined;
  }

  return requireUp(filename, dir);
}

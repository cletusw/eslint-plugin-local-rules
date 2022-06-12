var path = require('path');

/**
 * Attempt to require a file, recursively checking parent directories until found.
 * Similar to native `require` behavior, but doesn't check in `node_modules` folders.
 * Based on https://github.com/js-cli/node-findup-sync.
 *
 * @param filename {string} The name of the target file
 * @param exts {string[]} The file extensions to look for (e.g. '.cjs')
 * @param cwd {string} The directory to search in
 */
function requireUp(filename, exts, cwd) {
  for (var i = 0; i < exts.length; i++) {
    var filepath = path.resolve(cwd, filename) + exts[i];
    try {
      return require(filepath);
    } catch (error) {
      var filepathNotFound =
        error.code === 'MODULE_NOT_FOUND' &&
        error.message.includes(`Cannot find module '${filepath}'`);

      // Rethrow unless error is just saying `filepath` not found (in that case,
      // let next loop check parent directory instead).
      if (!filepathNotFound) {
        throw error;
      }
    }
  }
  var dir = path.dirname(cwd);
  if (dir === cwd) {
    return undefined;
  }
  return requireUp(filename, exts, dir);
}

module.exports = {
  requireUp,
};

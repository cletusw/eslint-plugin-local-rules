# Contributing

This plugin needs to run in as many environments as possible. Only use language features supported by the current "Maintenance LTS" Node.js release ([release schedule](https://github.com/nodejs/release#release-schedule)).

## Publishing

To publish a new version:

1. `npm version (major|minor|patch)`
2. `git push --follow-tags`
3. [Create a new release](https://github.com/cletusw/eslint-plugin-local-rules/releases/new) from the npm-created tag. Use the tag name for the "Release title" (e.g. "v2.0.0").
4. The [npm-publish](.github/workflows/npm-publish.yml) GitHub Action will automatically run the tests then `npm publish` the new release to the NPM registry (https://www.npmjs.com/package/eslint-plugin-local-rules).

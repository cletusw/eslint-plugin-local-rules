# eslint-plugin-local-rules

A plugin for ESLint that allows you to use project-specific rules, similar to the [`--rulesdir`](http://eslint.org/docs/user-guide/command-line-interface#--rulesdir) command line option ([more](http://eslint.org/docs/developer-guide/working-with-rules#runtime-rules)).

Workaround for https://github.com/eslint/eslint/issues/8769 (previously https://github.com/eslint/eslint/issues/2715).

## Other solutions

- https://github.com/taskworld/eslint-plugin-local
- https://github.com/not-an-aardvark/eslint-plugin-rulesdir
  - Allows for a custom rules directory name

## Dependencies

- Requires ESLint version 0.8.0 or higher

## Install

```
npm install eslint-plugin-local-rules
```

## Usage

### ./eslint-local-rules.js (or ./eslint-local-rules/index.js)

```javascript
'use strict';

module.exports = {
  'disallow-identifiers': {
    meta: {
      docs: {
        description: 'disallow identifiers',
        category: 'Possible Errors',
        recommended: false,
      },
      schema: [],
    },
    create: function (context) {
      return {
        Identifier: function (node) {
          context.report({
            node: node,
            message: 'Identifiers not allowed for Super Important reasons.',
          });
        },
      };
    },
  },
};
```

### ./.eslintrc

```json
{
  "plugins": ["eslint-plugin-local-rules"],

  "rules": {
    "local-rules/disallow-identifiers": 2
  }
}
```

### General eslint plugin config

If you need to specify additional eslint plugin config such as 
[`processors`](https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins), consider using 
https://github.com/taskworld/eslint-plugin-local. 

## License

MIT

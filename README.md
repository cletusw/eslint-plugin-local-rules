# eslint-plugin-local-rules
A plugin for ESLint that allows you to use project-specific rules, similar to the [`--rulesdir`](http://eslint.org/docs/user-guide/command-line-interface#--rulesdir) command line option ([more](http://eslint.org/docs/developer-guide/working-with-rules#runtime-rules)).

Workaround for https://github.com/eslint/eslint/issues/8769 (previously https://github.com/eslint/eslint/issues/2715).

See https://github.com/taskworld/eslint-plugin-local for another solution.


## Dependencies

* Requires ESLint version 0.8.0 or higher


## Install

```
npm install eslint-plugin-local-rules
```


## Usage

### ./eslint-local-rules.js

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
    create: function(context) {
      return {
        Identifier: function(node) {
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
  "plugins": [
    "eslint-plugin-local-rules"
  ],

  "rules": {
    "local-rules/disallow-identifiers": 2
  }
}
```


## License

MIT

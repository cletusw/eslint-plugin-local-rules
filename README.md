# eslint-plugin-local-rules

A plugin for ESLint that allows you to use project-specific rules, similar to the [`--rulesdir`](http://eslint.org/docs/user-guide/command-line-interface#--rulesdir) command line option ([more](http://eslint.org/docs/developer-guide/working-with-rules#runtime-rules)).

Workaround for https://github.com/eslint/eslint/issues/8769 (previously https://github.com/eslint/eslint/issues/2715).

## Other solutions

- https://github.com/taskworld/eslint-plugin-local
  - Allows specifying additonal plugin config such as 
    [`processors`](https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins)
- https://github.com/not-an-aardvark/eslint-plugin-rulesdir
  - Allows for a custom rules directory name

## Dependencies

- Requires ESLint version 0.8.0 or higher

## Install

```
npm install eslint-plugin-local-rules
```

<h2 id="usage">Usage (JavaScript)</h3>

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

## Usage (TypeScript)

```
npm install ts-node @types/eslint
```

### ./eslint-local-rules/index.js

```javascript
require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
  },
});

module.exports = require("./rules").default;
```

### ./eslint-local-rules/rules.ts

```typescript
import type { Rule } from "eslint";

export default {
  "disallow-identifiers": {
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
} satisfies Record<string, Rule.RuleModule>;
```

## npm/yarn/pnpm workspaces support

This plugin supports npm/yarn/pnpm workspaces, although note that if the eslint-local-rules.js file is in the workspace subdirectory, running from the project root is unsupported.

For example, if there's an eslint-local-rules.js and index.js in ./src/app:

Wrong: `npx eslint src/app/index.js`

Right: `(cd src/app; npx eslint index.js)`

Also note that if there is an eslint-local-rules.js file in *both* the workspace subdirectory and project root, the workspace one takes precedence (assuming you're running eslint from the workspace directory, as above).

## License

MIT

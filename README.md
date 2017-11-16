# Criptext JS Tools

Lint and format JS code with zero configuration.

## Install

```
yarn add --dev criptext-js-tools
```

Then add these lines to your `package.json`:

``` diff
  "scripts": {
+    "lint": "criptext-js-tools lint",
+    "test": "criptext-js-tools test"
  },
```

## Scripts

### Lint

This will format your js files with [prettier](https://github.com/prettier/prettier), and then check them with [eslint](https://github.com/eslint/eslint). Only files inside `src` will be processed.


### Test

This will look for test files and run them with Jest.

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

This will format your js files with [prettier](https://github.com/prettier/prettier), and then check them with [eslint](https://github.com/eslint/eslint). Only files inside `src` will be processed. On a CI environment, no files are modified, instead, when unformatted files are found, an error detailing the filepaths is thrown. 

The rules used depend on your project. If your project lists 'react-dom' as a dependency, it is considered a 'frontend' project and [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)'s recommended rules are added.

### Format

This script takes a file name as parameter and source code via STDIN, and it will format the source code with Prettier and print it to STDOUT. For example you can call it like this:

```
cat foo.js > criptext-js-tools foo.js
```

This is useful fo editor plugins that run external commands to format the current buffer. Please note that it is not necessary to pass the actual file name as parameter, as long as the extension is correct, Prettier will be able to figure out which parser it should use.

### Test

This will look for unit test files and runs them in parallel with [Jest](https://facebook.github.io/jest/). The pattern used to match test files is Jest's default:

>  By default it looks for .js and .jsx files inside of __tests__ folders, as well as any files with a suffix of .test or .spec (e.g. Component.test.js or Component.spec.js). It will also find files called test.js or spec.js.

 Any command line arguments that you pass to this script will be directly forwarded to Jest.

### Integration

This also runs tests with Jest, but it uses a different pattern for matching tests and runs them sequentially (using `--runInBand`). This script matches any file that ends in `.integration.js`. Without parallelization the test suite is slower but it is useful for testing how well your program integrates with stateful external elements like databases. 


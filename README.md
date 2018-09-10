# Bob (the builder)

**Warning** Totally in development, totally not usable, mostly for my personal use, so I won't do support on this

Builder generating a webpack configuration from a fluid API

## Usage:

```js
// In a webpack.config.js

const { bob } = require("bobpack");

module.exports = (env, options) =>
    // For example to target node.js
    bob(env, options, "node")
        // What to use to build the source maps
        .devtool("#source-map")

        // Could also be used like this
        .devtool(production => (production ? "#source-map" : "#cheap-module-source-map"))

        // Adds an entry (name => path)
        .entry("index", "packages/index.ts")

        // Can create multiple entries and use an array instead of a string
        .entry("cli", ["packages/cli/.entry1.ts", "packages/cli/entry2.ts"])

        // Modules to use (See below for available ones)
        .modules("typescript")

        // Optional namespace for your source code
        .namespace("@bob", "packages")

        // Where to output stuff
        .output("bin")

        // Resolve
        .resolve("packages")

        // Clean
        .clean("bin")

        // Build configuration
        .build();
```

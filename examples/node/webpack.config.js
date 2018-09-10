require("source-map-support/register");

const { bob } = require("../../dist/index.js");

module.exports = (env, options) =>
    bob(env, options, "node")
        // Devtool
        .devtool("#source-map")

        // Entry
        .entry("index", "examples/node/packages/index.ts")

        // Modules
        .modules("typescript")

        // Namespace
        .namespace("@bob", "examples/node/packages")

        // Where to output stuff
        .output("examples/node/bin")

        // Resolve
        .resolve("examples/node/packages")

        // Clean
        .clean("examples/node/bin")

        // Build configuration
        .build();

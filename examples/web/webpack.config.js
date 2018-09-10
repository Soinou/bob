require("source-map-support/register");

const { bob } = require("../../dist/index");

module.exports = (env, options) =>
    bob(env, options, "web")
        // webpack-serve options
        .serve(3004, 8081, "/assets/")

        // Devtool
        .devtool("#cheap-module-eval-source-map")

        // Can also be used like this
        // .devtool(production => production ? "#source-map" : "#cheap-module-eval-source-map")

        // Entry name and path (Can be an array of string)
        .entry("app", "examples/web/packages/index.ts")

        // Modules to use
        .modules("css", "typescript", "handlebars", "vue", "stylus", "pug")

        // Optional namespace (To alias @angular or @babel style)
        .namespace("@bob", "examples/web/packages")

        // Where to output files and what to use as publicPath (Not used for node target)
        .output("examples/web/public/assets", "/assets/")

        // Resolve the given directory as well as the node_modules directory
        .resolve("examples/web/packages")

        // Add an HtmlWebpackPlugin with the given template
        .html("examples/web/packages/index.hbs")

        // Clean that directory and exclude those files
        .clean("examples/web/public/assets" /*, ["bootstrap.js", "bootstrap.css"] */)

        // Build the configuration and return it
        .build();

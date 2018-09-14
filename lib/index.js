"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var os = require("os");
var path = require("path");
var VueLoaderPlugin = require("vue-loader/lib/plugin");
var nodeExternals = require("webpack-node-externals");
var analyzer_1 = require("./analyzer");
var clean_1 = require("./clean");
var css_1 = require("./css");
var handlebars_1 = require("./handlebars");
var html_1 = require("./html");
var output_1 = require("./output");
var pug_1 = require("./pug");
var sass_1 = require("./sass");
var serve_1 = require("./serve");
var stylus_1 = require("./stylus");
var typescript_1 = require("./typescript");
var uglify_1 = require("./uglify");
var vue_1 = require("./vue");
/**
 * Bob, the builder
 */
var Builder = /** @class */ (function () {
    /**
     * Creates a new Builder
     * @param _ Env options (Not used)
     * @param options CLI Options (Depends on the CLI used)
     * @param target Target (web or node)
     */
    function Builder(/* env */ _, options, target) {
        if (target === void 0) { target = "web"; }
        var bobEnv = process.env.BOB_ENV;
        this.target = target;
        this.production = (options != null && options.mode === "production") || bobEnv === "production";
        this.parallel = os.cpus().length >= 2;
        this.serving = process.env.WEBPACK_SERVE != null;
        this.configuration = {
            entry: {},
            externals: {},
            mode: this.production ? "production" : "development",
            module: { rules: [] },
            optimization: { noEmitOnErrors: true },
            plugins: [],
            resolve: { alias: {} },
            target: target,
        };
    }
    /**
     * Adds webpack-serve ready options
     * @param port Port for the webpack-serve backend
     * @param hmrPort Port the the webpack-serve HMR backend (The hot reload websocket)
     * @param publicPath Public path (Should be the same as the output one)
     */
    Builder.prototype.serve = function (port, hmrPort, publicPath) {
        this.configuration.serve = serve_1.serve(port, hmrPort, publicPath);
        return this;
    };
    /**
     * Changes the source-map output type
     * @param devtool Devtool to use
     */
    Builder.prototype.devtool = function (devtool) {
        if (typeof devtool === "string") {
            this.configuration.devtool = devtool;
        }
        else {
            this.configuration.devtool = devtool(this.production);
        }
        return this;
    };
    /**
     * Adds an entry to the webpack output
     * @param entryName Entry name
     * @param entryPath Entry path or paths
     */
    Builder.prototype.entry = function (entryName, entryPath) {
        if (typeof entryPath === "string") {
            this.configuration.entry[entryName] = path.resolve(entryPath);
        }
        else {
            this.configuration.entry[entryName] = entryPath.map(function (entry) { return path.resolve(entry); });
        }
        return this;
    };
    /**
     * Defines an external
     * @param key External key
     * @param value External value
     */
    Builder.prototype.external = function (key, value) {
        this.configuration.externals[key] = value;
        return this;
    };
    /**
     * Defines some externals
     * @param externals String map of externals
     */
    Builder.prototype.externals = function (externals) {
        var _this = this;
        Object.keys(externals).forEach(function (key) {
            _this.external(key, externals[key]);
        });
        return this;
    };
    /**
     * Creates the modules configuration rule
     * @param loaders Loaders to use
     */
    Builder.prototype.modules = function () {
        var _this = this;
        var loaders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            loaders[_i] = arguments[_i];
        }
        var rules = [];
        var extensions = [".js"];
        loaders.forEach(function (loader) {
            switch (loader) {
                case "css":
                    rules.push(css_1.css(_this.production));
                    extensions.push(".css");
                    break;
                case "handlebars":
                    rules.push(handlebars_1.handlebars());
                    extensions.push(".hbs");
                    break;
                case "pug":
                    rules.push(pug_1.pug());
                    extensions.push(".pug");
                    break;
                case "sass":
                    rules.push(sass_1.sass(_this.production));
                    extensions.push(".sass", ".scss");
                    break;
                case "stylus":
                    rules.push(stylus_1.stylus(_this.production));
                    extensions.push(".styl", ".stylus");
                    break;
                case "typescript":
                    rules.push(typescript_1.typescript(_this.parallel));
                    extensions.push(".ts", ".tsx");
                    break;
                case "vue":
                    rules.push(vue_1.vue());
                    extensions.push(".vue");
                    _this.alias("vue$", "vue/dist/vue.common.js");
                    _this.configuration.plugins.push(new VueLoaderPlugin());
                    break;
                default:
                    break;
            }
        });
        this.configuration.module.rules = rules;
        this.configuration.resolve.extensions = extensions;
        return this;
    };
    /**
     * Defines the output rules
     * @param directory Directory to output to
     * @param publicPath Public path to use when targeting the web
     */
    Builder.prototype.output = function (directory, publicPath) {
        this.configuration.output = output_1.output(this.target, this.production, directory, publicPath);
        return this;
    };
    /**
     * Optional namespace (à la @angular or @babel)
     * @param namespace Namespace (Like "@bob")
     * @param directory Directory to use as the alias root (Like "packages")
     */
    Builder.prototype.namespace = function (namespace, directory) {
        this.configuration.resolve.alias[namespace] = path.resolve(directory);
        return this;
    };
    /**
     * Defines the resolve rules
     * @param directory Directory to add alongside the node_modules directory
     */
    Builder.prototype.resolve = function (directory) {
        this.configuration.resolve.modules = [path.resolve("node_modules"), path.resolve(directory)];
        return this;
    };
    /**
     * Defines an alias
     * @param key Alias key
     * @param value Alias value
     */
    Builder.prototype.alias = function (key, value) {
        this.configuration.resolve.alias[key] = value;
        return this;
    };
    /**
     * Defines multiple aliases
     * @param aliases String map of aliases
     */
    Builder.prototype.aliases = function (aliases) {
        var _this = this;
        Object.keys(aliases).forEach(function (key) {
            _this.alias(key, aliases[key]);
        });
        return this;
    };
    /**
     * Adds a CleanWebpackPlugin to the plugins
     * @param directory Directory to clean
     * @param exclude Files to exclude (Optional)
     */
    Builder.prototype.clean = function (directory, exclude) {
        if (exclude === void 0) { exclude = []; }
        this.configuration.plugins.push(clean_1.clean(directory, exclude));
        return this;
    };
    /**
     * Adds an HtmlWebpackPlugin to the plugins
     * @param template Template file to use
     */
    Builder.prototype.html = function (template) {
        this.configuration.plugins.push(html_1.html(this.serving, template));
        return this;
    };
    /**
     * Builds the configuration
     */
    Builder.prototype.build = function () {
        if (this.target === "node") {
            this.configuration.externals = [nodeExternals()];
        }
        if (this.production) {
            this.configuration.optimization.minimizer = [uglify_1.uglify()];
            if (this.target === "web") {
                this.configuration.optimization.runtimeChunk = "single";
                this.configuration.optimization.splitChunks = {
                    chunks: "all",
                    name: true,
                };
            }
            this.configuration.output.pathinfo = true;
            this.configuration.plugins.push(new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" }));
        }
        if (this.serving) {
            this.configuration.plugins.push(analyzer_1.analyzer());
        }
        return this.configuration;
    };
    return Builder;
}());
/**
 * Convenience function
 * @param env Env of the webpack CLI
 * @param options Options of the webpack CLI
 * @param target Target
 */
function bob(env, options, target) {
    return new Builder(env, options, target);
}
exports.bob = bob;
//# sourceMappingURL=index.js.map
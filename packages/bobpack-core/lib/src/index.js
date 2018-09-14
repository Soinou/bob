"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var path = require("path");
var nodeExternals = require("webpack-node-externals");
var analyzer_1 = require("./analyzer");
var output_1 = require("./output");
var uglify_1 = require("./uglify");
function safeRequire(name) {
    try {
        return require(path.resolve("node_modules", name));
    }
    catch (error) {
        throw new Error("Impossible to load package " + name + ". Install it and try again");
    }
}
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
        this.cssExtractPlugin = null;
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
        var serve = safeRequire("@bobpack/serve").serve;
        this.configuration.serve = serve(port, hmrPort, publicPath);
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
                    var _a = safeRequire("@bobpack/css"), css = _a.css, cssExtractPlugin = _a.cssExtractPlugin;
                    rules.push(css(_this.production));
                    extensions.push(".css");
                    if (_this.cssExtractPlugin == null) {
                        _this.cssExtractPlugin = cssExtractPlugin;
                    }
                    break;
                case "handlebars":
                    var handlebars = safeRequire("@bobpack/handlebars").handlebars;
                    rules.push(handlebars());
                    extensions.push(".hbs");
                    break;
                case "pug":
                    var pug = safeRequire("@bobpack/pug").pug;
                    rules.push(pug());
                    extensions.push(".pug");
                    break;
                case "sass":
                    var _b = safeRequire("@bobpack/sass"), sass = _b.sass, sassExtractPlugin = _b.sassExtractPlugin;
                    rules.push(sass(_this.production));
                    extensions.push(".sass", ".scss");
                    if (_this.cssExtractPlugin == null) {
                        _this.cssExtractPlugin = sassExtractPlugin;
                    }
                    break;
                case "stylus":
                    var _c = safeRequire("@bobpack/stylus"), stylus = _c.stylus, stylusExtractPlugin = _c.stylusExtractPlugin;
                    rules.push(stylus(_this.production));
                    extensions.push(".styl", ".stylus");
                    if (_this.cssExtractPlugin == null) {
                        _this.cssExtractPlugin = stylusExtractPlugin;
                    }
                    break;
                case "typescript":
                    var typescript = safeRequire("@bobpack/typescript").typescript;
                    rules.push(typescript(_this.parallel));
                    extensions.push(".ts", ".tsx");
                    break;
                case "vue":
                    var _d = safeRequire("@bobpack/vue"), vue = _d.vue, vuePlugin = _d.vuePlugin;
                    rules.push(vue());
                    extensions.push(".vue");
                    _this.alias("vue$", "vue/dist/vue.common.js");
                    _this.configuration.plugins.push(vuePlugin());
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
        var clean = safeRequire("@bobpack/clean").clean;
        this.configuration.plugins.push(clean(directory, exclude));
        return this;
    };
    /**
     * Adds an HtmlWebpackPlugin to the plugins
     * @param template Template file to use
     */
    Builder.prototype.html = function (template) {
        var html = safeRequire("@bobpack/html").html;
        this.configuration.plugins.push(html(this.serving, template));
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
            this.configuration.plugins.push(this.cssExtractPlugin({ filename: "styles.[contenthash].css" }));
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
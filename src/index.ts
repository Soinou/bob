import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as os from "os";
import * as path from "path";
import * as VueLoaderPlugin from "vue-loader/lib/plugin";
import * as webpack from "webpack";
import * as nodeExternals from "webpack-node-externals";

import { analyzer } from "./analyzer";
import { clean } from "./clean";
import { css } from "./css";
import { devServer } from "./devServer";
import { handlebars } from "./handlebars";
import { html } from "./html";
import { output } from "./output";
import { pug } from "./pug";
import { sass } from "./sass";
import { serve } from "./serve";
import { stylus } from "./stylus";
import { typescript } from "./typescript";
import { uglify } from "./uglify";
import { vue } from "./vue";

/**
 * The devtool callback
 */
type DevtoolCallback = (production: boolean) => string;

/**
 * Bob, the builder
 */
class Builder {
    /**
     * If we should use parallel options (Basically thread-loader)
     */
    public readonly parallel: boolean;

    /**
     * If the production mode is enabled (Detected through various means)
     */
    public readonly production: boolean;

    /**
     * If the configuration is used for webpack-serve or webpack-dev-server
     */
    public readonly serving: boolean;

    /**
     * The target (node or web)
     */
    public readonly target: string;

    /**
     * The built configuration
     */
    private configuration: any;

    /**
     * Creates a new Builder
     * @param _ Env options (Not used)
     * @param options CLI Options (Depends on the CLI used)
     * @param target Target (web or node)
     */
    constructor(/* env */ _: any, options: any, target: "web" | "node" = "web") {
        const bobEnv = process.env.BOB_ENV;

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
            target,
        };
    }

    /**
     * Adds webpack-dev-server ready options
     * @param port Port of the webpack-dev-server backend
     * @param publicPath Public path (Should be the same as the output one)
     */
    public devServer(port: number, publicPath: string) {
        this.configuration.devServer = devServer(port, publicPath);

        return this;
    }

    /**
     * Adds webpack-serve ready options
     * @param port Port for the webpack-serve backend
     * @param hmrPort Port the the webpack-serve HMR backend (The hot reload websocket)
     * @param publicPath Public path (Should be the same as the output one)
     */
    public serve(port: number, hmrPort: number, publicPath: string) {
        this.configuration.serve = serve(port, hmrPort, publicPath);

        return this;
    }

    /**
     * Changes the source-map output type
     * @param devtool Devtool to use
     */
    public devtool(devtool: string | DevtoolCallback) {
        if (typeof devtool === "string") {
            this.configuration.devtool = devtool;
        } else {
            this.configuration.devtool = devtool(this.production);
        }

        return this;
    }

    /**
     * Adds an entry to the webpack output
     * @param entryName Entry name
     * @param entryPath Entry path or paths
     */
    public entry(entryName: string, entryPath: string | string[]) {
        if (typeof entryPath === "string") {
            this.configuration.entry[entryName] = path.resolve(entryPath);
        } else {
            this.configuration.entry[entryName] = entryPath.map(entry => path.resolve(entry));
        }

        return this;
    }

    /**
     * Defines an external
     * @param key External key
     * @param value External value
     */
    public external(key: string, value: string) {
        this.configuration.externals[key] = value;

        return this;
    }

    /**
     * Defines some externals
     * @param externals String map of externals
     */
    public externals(externals: { [key: string]: string }) {
        Object.keys(externals).forEach(key => {
            this.external(key, externals[key]);
        });

        return this;
    }

    /**
     * Creates the modules configuration rule
     * @param loaders Loaders to use
     */
    public modules(...loaders: Array<"css" | "handlebars" | "pug" | "sass" | "stylus" | "typescript" | "vue">) {
        const rules: any[] = [];
        const extensions: string[] = [".js"];

        loaders.forEach(loader => {
            switch (loader) {
                case "css":
                    rules.push(css(this.production));
                    extensions.push(".css");
                    break;
                case "handlebars":
                    rules.push(handlebars());
                    extensions.push(".hbs");
                    break;
                case "pug":
                    rules.push(pug());
                    extensions.push(".pug");
                    break;
                case "sass":
                    rules.push(sass(this.production));
                    extensions.push(".sass", ".scss");
                    break;
                case "stylus":
                    rules.push(stylus(this.production));
                    extensions.push(".styl", ".stylus");
                    break;
                case "typescript":
                    rules.push(typescript(this.parallel, loaders.includes("vue")));
                    extensions.push(".ts", ".tsx");
                    break;
                case "vue":
                    rules.push(vue());
                    extensions.push(".vue");
                    this.alias("vue$", "vue/dist/vue.common.js");
                    this.configuration.plugins.push(new VueLoaderPlugin());
                    break;
                default:
                    break;
            }
        });

        this.configuration.module.rules = rules;
        this.configuration.resolve.extensions = extensions;

        return this;
    }

    /**
     * Defines the output rules
     * @param directory Directory to output to
     * @param publicPath Public path to use when targeting the web
     */
    public output(directory: string, publicPath?: string) {
        this.configuration.output = output(this.target, this.production, directory, publicPath);

        return this;
    }

    /**
     * Optional namespace (à la @angular or @babel)
     * @param namespace Namespace (Like "@bob")
     * @param directory Directory to use as the alias root (Like "packages")
     */
    public namespace(namespace: string, directory: string) {
        this.configuration.resolve.alias[namespace] = path.resolve(directory);

        return this;
    }

    /**
     * Defines the resolve rules
     * @param directory Directory to add alongside the node_modules directory
     */
    public resolve(directory: string) {
        this.configuration.resolve.modules = [path.resolve("node_modules"), path.resolve(directory)];

        return this;
    }

    /**
     * Defines an alias
     * @param key Alias key
     * @param value Alias value
     */
    public alias(key: string, value: string) {
        this.configuration.resolve.alias[key] = value;

        return this;
    }

    /**
     * Defines multiple aliases
     * @param aliases String map of aliases
     */
    public aliases(aliases: { [key: string]: string }) {
        Object.keys(aliases).forEach(key => {
            this.alias(key, aliases[key]);
        });

        return this;
    }

    /**
     * Adds a CleanWebpackPlugin to the plugins
     * @param directory Directory to clean
     * @param exclude Files to exclude (Optional)
     */
    public clean(directory: string, exclude: string[] = []) {
        this.configuration.plugins.push(clean(directory, exclude));

        return this;
    }

    /**
     * Adds an HtmlWebpackPlugin to the plugins
     * @param template Template file to use
     */
    public html(template: string) {
        this.configuration.plugins.push(html(this.serving, template));

        return this;
    }

    /**
     * Builds the configuration
     */
    public build() {
        if (this.target === "node") {
            this.configuration.externals = [nodeExternals()];
        }

        if (this.production) {
            this.configuration.optimization.minimizer = [uglify()];

            if (this.target === "web") {
                this.configuration.optimization.runtimeChunk = "single";

                this.configuration.optimization.splitChunks = {
                    cacheGroups: {
                        vendor: {
                            name: (module: any) => {
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                                return `npm.${packageName.replace("@", "")}`;
                            },
                            test: /[\\/]node_modules[\\/]/,
                        },
                    },
                    chunks: "all",
                    // This is some black magic right here
                    maxAsyncRequests: Infinity,
                    maxInitialRequests: Infinity,
                    minSize: 0,
                };
            }

            this.configuration.output.pathinfo = true;

            this.configuration.plugins.push(
                new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" }),
                new webpack.HashedModuleIdsPlugin(),
            );
        }

        this.configuration.plugins.push(analyzer(this.serving));

        return this.configuration;
    }
}

/**
 * Convenience function
 * @param env Env of the webpack CLI
 * @param options Options of the webpack CLI
 * @param target Target
 */
export function bob(env: any, options: any, target: "node" | "web") {
    return new Builder(env, options, target);
}

/**
 * The devtool callback
 */
declare type DevtoolCallback = (production: boolean) => string;
/**
 * Bob, the builder
 */
declare class Builder {
    /**
     * If we should use parallel options (Basically thread-loader)
     */
    readonly parallel: boolean;
    /**
     * If the production mode is enabled (Detected through various means)
     */
    readonly production: boolean;
    /**
     * If the configuration is used for webpack-serve or webpack-dev-server
     */
    readonly serving: boolean;
    /**
     * The target (node or web)
     */
    readonly target: string;
    /**
     * The built configuration
     */
    private configuration;
    /**
     * Creates a new Builder
     * @param _ Env options (Not used)
     * @param options CLI Options (Depends on the CLI used)
     * @param target Target (web or node)
     */
    constructor(/* env */ _: any, options: any, target?: "web" | "node");
    /**
     * Adds webpack-serve ready options
     * @param port Port for the webpack-serve backend
     * @param hmrPort Port the the webpack-serve HMR backend (The hot reload websocket)
     * @param publicPath Public path (Should be the same as the output one)
     */
    serve(port: number, hmrPort: number, publicPath: string): this;
    /**
     * Changes the source-map output type
     * @param devtool Devtool to use
     */
    devtool(devtool: string | DevtoolCallback): this;
    /**
     * Adds an entry to the webpack output
     * @param entryName Entry name
     * @param entryPath Entry path or paths
     */
    entry(entryName: string, entryPath: string | string[]): this;
    /**
     * Defines an external
     * @param key External key
     * @param value External value
     */
    external(key: string, value: string): this;
    /**
     * Defines some externals
     * @param externals String map of externals
     */
    externals(externals: {
        [key: string]: string;
    }): this;
    /**
     * Creates the modules configuration rule
     * @param loaders Loaders to use
     */
    modules(...loaders: Array<"css" | "handlebars" | "pug" | "sass" | "stylus" | "typescript" | "vue">): this;
    /**
     * Defines the output rules
     * @param directory Directory to output to
     * @param publicPath Public path to use when targeting the web
     */
    output(directory: string, publicPath?: string): this;
    /**
     * Optional namespace (à la @angular or @babel)
     * @param namespace Namespace (Like "@bob")
     * @param directory Directory to use as the alias root (Like "packages")
     */
    namespace(namespace: string, directory: string): this;
    /**
     * Defines the resolve rules
     * @param directory Directory to add alongside the node_modules directory
     */
    resolve(directory: string): this;
    /**
     * Defines an alias
     * @param key Alias key
     * @param value Alias value
     */
    alias(key: string, value: string): this;
    /**
     * Defines multiple aliases
     * @param aliases String map of aliases
     */
    aliases(aliases: {
        [key: string]: string;
    }): this;
    /**
     * Adds a CleanWebpackPlugin to the plugins
     * @param directory Directory to clean
     * @param exclude Files to exclude (Optional)
     */
    clean(directory: string, exclude?: string[]): this;
    /**
     * Adds an HtmlWebpackPlugin to the plugins
     * @param template Template file to use
     */
    html(template: string): this;
    /**
     * Builds the configuration
     */
    build(): any;
}
/**
 * Convenience function
 * @param env Env of the webpack CLI
 * @param options Options of the webpack CLI
 * @param target Target
 */
export declare function bob(env: any, options: any, target: "node" | "web"): Builder;
export {};

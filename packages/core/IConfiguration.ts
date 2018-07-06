type Loader = "css" | "handlebars" | "sass" | "stylus" | "typescript";

export interface IConfiguration {
    /* Mandatory stuff for a minimal config */

    // Bundle target
    target: "web" | "node";

    // Entry file
    entry: string;

    // Namespace
    namespace: string;

    // Loaders
    loaders: Loader[];

    /* CLI Parameters */

    // If we're bundling in production
    production: boolean;

    // If we're watching files (Using webpack dev server or not)
    watch: boolean;

    // If we should launch the bundle analyzer
    analyzer: boolean;

    /* Extra stuff */

    // List of aliases
    alias: {
        [key: string]: string;
    };

    // Webpack externals
    externals: {
        [key: string]: string;
    };

    /* Plugins properties */

    plugins: {
        // Clean plugin properties
        clean: {
            paths: string[];
            exclude: string[];
        };

        // Html plugin properties
        html: {
            template: string;
            title: string;
        };
    };

    /* Dev server parameters */

    serve?: {
        content?: string[];
        host?: string;
        port?: number;
    };
}

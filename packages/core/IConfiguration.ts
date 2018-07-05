type Loader = "css" | "handlebars" | "stylus" | "typescript";

export interface IConfiguration {
    /* Mandatory stuff for a minimal config */

    // Bundle target
    target: "web" | "node";

    // Entry file
    entry: string;

    // Namespace
    namespace: string;

    // Loaders
    loaders: string[];

    /* CLI Parameters */

    // If we're bundling in production
    production: boolean;

    // If we're watching files (Using webpack dev server or not)
    watch: boolean;

    /* Extra stuff */

    // List of aliases
    alias: {
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
            title: string;
            filename: string | [string, string];
        };
    };

    /* Dev server parameters */

    serve?: {
        content?: string[];
        host?: string;
        port?: number;

        // Websocket parameters
        hot?: {
            clientHost?: string;
            port?: number;
            serverHost?: string;
        };
    };
}

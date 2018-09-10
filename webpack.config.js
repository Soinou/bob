const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

module.exports = (_, options) => {
    const nodeEnv = process.env.NODE_ENV;
    const mode = (options || {}).mode || "development";
    const production = mode === "production" || nodeEnv === "production";

    const result = {
        devtool: "#cheap-module-source-map",
        entry: "./packages/index.ts",
        externals: [nodeExternals()],
        mode: production ? "production" : "development",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: [path.resolve("node_modules")],
                    loader: "ts-loader",
                    options: {
                        experimentalWatchApi: true,
                        onlyCompileBundledFiles: true,
                        reportFiles: [],
                        silent: true,
                        transpileOnly: true,
                    },
                },
            ],
        },
        output: {
            filename: "index.js",
            libraryTarget: "commonjs2",
            path: path.resolve("dist"),
        },
        plugins: [new CleanWebpackPlugin(["dist", "lib", "types"])],
        resolve: {
            modules: ["node_modules", path.resolve("packages")],
            extensions: [".ts", ".js"],
        },
        target: "node",
    };

    if (production) {
        result.devtool = "#source-map";
        result.output.pathinfo = true;
    }

    return result;
};

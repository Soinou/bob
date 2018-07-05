const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
    devtool: "#source-map",
    entry: "./packages/cli/index.ts",
    externals: [nodeExternals()],
    mode: "development",
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
        path: path.resolve("bin"),
        filename: "index-fallback.js",
    },
    resolve: {
        modules: ["node_modules", path.resolve("packages")],
        extensions: [".ts", ".js"],
        alias: {
            "@bob": path.resolve("packages"),
        },
    },
    target: "node",
};

"use strict";
exports.__esModule = true;
exports.typescript = function (parallel) {
    var loaders = [];
    if (parallel) {
        loaders.push("thread-loader");
    }
    loaders.push({
        loader: "ts-loader",
        options: {
            appendTsSuffixTo: [/\.vue$/],
            experimentalWatchApi: true,
            happyPackMode: parallel,
            onlyCompileBundledFiles: true,
            reportFiles: [],
            silent: true,
            transpileOnly: true
        }
    });
    return {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: loaders
    };
};

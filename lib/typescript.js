"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescript = function (parallel, hasVue) {
    var loaders = [];
    if (parallel && !hasVue) {
        loaders.push("thread-loader");
    }
    var tsLoaderOptions = {
        experimentalWatchApi: true,
        onlyCompileBundledFiles: true,
        reportFiles: [],
        silent: true,
        transpileOnly: true,
    };
    if (hasVue) {
        tsLoaderOptions.appendTsSuffixTo = [/\.vue$/];
    }
    else if (parallel) {
        tsLoaderOptions.happyPackMode = true;
    }
    loaders.push({
        loader: "ts-loader",
        options: tsLoaderOptions,
    });
    return {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: loaders,
    };
};
//# sourceMappingURL=typescript.js.map
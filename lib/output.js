"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function output(target, production, directory, publicPath) {
    if (target === "web") {
        return {
            filename: production ? "[name].[contenthash].js" : "[name].js",
            path: path.resolve(directory),
            publicPath: publicPath,
        };
    }
    else {
        return {
            filename: "[name].js",
            path: path.resolve(directory),
        };
    }
}
exports.output = output;
//# sourceMappingURL=output.js.map
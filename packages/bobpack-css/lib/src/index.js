"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.css = function (production) {
    var loaders = [];
    if (production) {
        loaders.push(MiniCssExtractPlugin.loader, { loader: "css-loader", options: { minimize: true } });
    }
    else {
        loaders.push("style-loader", "css-loader");
    }
    return {
        test: /\.css$/,
        use: loaders,
    };
};
exports.cssExtractPlugin = function (options) { return new MiniCssExtractPlugin(options); };
//# sourceMappingURL=index.js.map
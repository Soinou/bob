"use strict";
exports.__esModule = true;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.stylus = function (production) {
    var loaders = [];
    if (production) {
        loaders.push(MiniCssExtractPlugin.loader, { loader: "css-loader", options: { minimize: true } });
    }
    else {
        loaders.push("style-loader", "css-loader");
    }
    loaders.push("stylus-loader");
    return {
        test: /\.(stylus|styl)$/,
        use: loaders
    };
};
exports.stylusExtractPlugin = function (options) { return new MiniCssExtractPlugin(options); };

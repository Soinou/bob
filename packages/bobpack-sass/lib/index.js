"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.sass = function (production) {
    var loaders = [];
    if (production) {
        loaders.push(MiniCssExtractPlugin.loader, { loader: "css-loader", options: { minimize: true } });
    }
    else {
        loaders.push("style-loader", "css-loader");
    }
    loaders.push("sass-loader");
    return {
        test: /\.s[ac]ss$/,
        use: loaders,
    };
};
exports.sassExtractPlugin = function (options) { return new MiniCssExtractPlugin(options); };
//# sourceMappingURL=index.js.map
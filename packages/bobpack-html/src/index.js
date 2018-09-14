"use strict";
exports.__esModule = true;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
function html(serve, template) {
    return new HtmlWebpackPlugin({
        filename: serve ? "index.html" : "../index.html",
        inject: true,
        template: path.resolve(template)
    });
}
exports.html = html;

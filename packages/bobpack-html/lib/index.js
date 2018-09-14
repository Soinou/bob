"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
function html(serve, template) {
    return new HtmlWebpackPlugin({
        filename: serve ? "index.html" : "../index.html",
        inject: true,
        template: path.resolve(template),
    });
}
exports.html = html;
//# sourceMappingURL=index.js.map
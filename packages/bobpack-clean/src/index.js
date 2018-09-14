"use strict";
exports.__esModule = true;
var CleanWebpackPlugin = require("clean-webpack-plugin");
var path = require("path");
function clean(directory, exclude) {
    return new CleanWebpackPlugin([path.resolve(directory)], {
        exclude: exclude,
        root: process.cwd(),
        verbose: false
    });
}
exports.clean = clean;

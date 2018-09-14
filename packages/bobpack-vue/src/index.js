"use strict";
exports.__esModule = true;
var VueLoaderPlugin = require("vue-loader/lib/plugin");
function vue() {
    return {
        loader: "vue-loader",
        test: /\.vue$/
    };
}
exports.vue = vue;
function vuePlugin() {
    return new VueLoaderPlugin();
}
exports.vuePlugin = vuePlugin;

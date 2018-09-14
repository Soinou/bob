"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VueLoaderPlugin = require("vue-loader/lib/plugin");
function vue() {
    return {
        loader: "vue-loader",
        test: /\.vue$/,
    };
}
exports.vue = vue;
function vuePlugin() {
    return new VueLoaderPlugin();
}
exports.vuePlugin = vuePlugin;
//# sourceMappingURL=index.js.map
import * as VueLoaderPlugin from "vue-loader/lib/plugin";

export function vue() {
    return {
        loader: "vue-loader",
        test: /\.vue$/,
    };
}

export function vuePlugin() {
    return new VueLoaderPlugin();
}

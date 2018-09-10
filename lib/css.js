import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
export var css = function (production) {
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
//# sourceMappingURL=css.js.map
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
export var sass = function (production) {
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
//# sourceMappingURL=sass.js.map
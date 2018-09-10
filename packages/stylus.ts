import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

export const stylus = (production: boolean) => {
    const loaders = [];

    if (production) {
        loaders.push(MiniCssExtractPlugin.loader, { loader: "css-loader", options: { minimize: true } });
    } else {
        loaders.push("style-loader", "css-loader");
    }

    loaders.push("stylus-loader");

    return {
        test: /\.(stylus|styl)$/,
        use: loaders,
    };
};

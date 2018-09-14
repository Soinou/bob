import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

export const sass = (production: boolean) => {
    const loaders = [];

    if (production) {
        loaders.push(MiniCssExtractPlugin.loader, { loader: "css-loader", options: { minimize: true } });
    } else {
        loaders.push("style-loader", "css-loader");
    }

    loaders.push("sass-loader");

    return {
        test: /\.s[ac]ss$/,
        use: loaders,
    };
};

export const sassExtractPlugin = (options: any) => new MiniCssExtractPlugin(options);

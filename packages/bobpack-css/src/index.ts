import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

export const css = (production: boolean) => {
    const loaders = [];

    if (production) {
        loaders.push(MiniCssExtractPlugin.loader, { loader: "css-loader", options: { minimize: true } });
    } else {
        loaders.push("style-loader", "css-loader");
    }

    return {
        test: /\.css$/,
        use: loaders,
    };
};

export const cssExtractPlugin = (options: any) => new MiniCssExtractPlugin(options);

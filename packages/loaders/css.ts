import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as os from "os";

import { ILoader } from "@bob/core/ILoader";

export const css: ILoader = configuration => {
    const loaders = [];

    if (configuration.production) {
        loaders.push(MiniCssExtractPlugin.loader, { loader: "css-loader", options: { minimize: true } });
    } else {
        loaders.push("style-loader", "css-loader");
    }

    return {
        test: /\.css$/,
        use: loaders,
    };
};

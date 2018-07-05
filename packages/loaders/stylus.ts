import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as os from "os";

import { ILoader } from "@bob/core/ILoader";

export const stylus: ILoader = configuration => {
    const loaders = [];
    const thread = os.cpus().length > 2;

    if (thread) {
        loaders.push("thread-loader");
    }

    if (configuration.production) {
        loaders.push(MiniCssExtractPlugin.loader, { loader: "css-loader", options: { minimize: true } });
    } else {
        loaders.push("style-loader", "css-loader");
    }

    loaders.push("stylus-loader");

    return {
        exclude: /node_modules/,
        test: /\.styl$/,
        use: loaders,
    };
};

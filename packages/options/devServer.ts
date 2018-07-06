import * as path from "path";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";

export const devServer: IOption<any> = (configuration: IConfiguration) => {
    return {
        clientLogLevel: "info",
        compress: true,
        contentBase: path.resolve("public"),
        historyApiFallback: {
            index: "/assets/index.html",
        },
        hot: true,
        noInfo: false,
        publicPath: "/assets/",
        quiet: false,
    };
};

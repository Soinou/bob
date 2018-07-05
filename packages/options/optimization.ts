import * as webpack from "webpack";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";
import { uglify } from "@bob/plugins/uglify";

export const optimization: IOption<webpack.Options.Optimization> = ({ production, target }: IConfiguration) => {
    const result: webpack.Options.Optimization = {};

    if (production) {
        // Use custom uglify options
        result.minimizer = [uglify()];

        if (target === "web") {
            // Emit a runtime chunk for better caching
            result.runtimeChunk = "single";

            // Split chunks correctly
            result.splitChunks = {
                chunks: "all",
            };
        } else {
            result.splitChunks = false;
        }
    }

    // Don't emit on errors
    result.noEmitOnErrors = true;

    return result;
};

import * as webpack from "webpack";

import { IConfiguration } from "@bob/core/IConfiguration";
import { output } from "@bob/options/output";

import { entries } from "./entries";
import { externals } from "./externals";
import { optimization } from "./optimization";
import { plugins } from "./plugins";
import { resolve } from "./resolve";
import { rules } from "./rules";
import { serve } from "./serve";

export function create(configuration: IConfiguration): webpack.Configuration {
    const { production, target } = configuration;

    const options: webpack.Configuration = {
        devtool: production ? "#cheap-module-source-map" : "#cheap-module-eval-source-map",

        entry: entries(configuration),

        externals: externals(configuration),

        mode: production ? "production" : "development",

        module: {
            rules: rules(configuration),
        },

        name: "Bob",

        optimization: optimization(configuration),

        output: output(configuration),

        plugins: plugins(configuration),

        resolve: resolve(configuration),

        serve: serve(configuration),

        target: target || "web",
    };

    return options;
}

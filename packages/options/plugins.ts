import * as webpack from "webpack";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";
import { analyzer } from "@bob/plugins/analyzer";
import { clean } from "@bob/plugins/clean";
import { extract } from "@bob/plugins/extract";
import { html } from "@bob/plugins/html";
import { log } from "@bob/utils/log";

export const plugins: IOption<webpack.Plugin[]> = (configuration: IConfiguration) => {
    const result: webpack.Plugin[] = [];

    result.push(clean(configuration));

    if (
        configuration.production &&
        (configuration.loaders.includes("css") || configuration.loaders.includes("stylus"))
    ) {
        result.push(extract());
    }

    if (configuration.target === "web") {
        result.push(html(configuration));
    }

    if (configuration.serve) {
        result.push(new webpack.HotModuleReplacementPlugin());
        result.push(analyzer());
    }

    if (configuration.analyzer) {
        log.info("Starting bundle analyzer on 0.0.0.0:8888");
        result.push(analyzer());
    }

    return result;
};

import * as TimeFixPlugin from "time-fix-plugin";
import * as webpack from "webpack";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";
import { clean } from "@bob/plugins/clean";
import { extract } from "@bob/plugins/extract";
import { html } from "@bob/plugins/html";

export const plugins: IOption<webpack.Plugin[]> = (configuration: IConfiguration) => {
    const result: webpack.Plugin[] = [];

    result.push(new TimeFixPlugin());
    result.push(clean(configuration));

    if (
        configuration.production &&
        (configuration.loaders.includes("css") || configuration.loaders.includes("stylus"))
    ) {
        result.push(extract());
    }

    if (configuration.serve) {
        result.push(html(configuration));
    }

    return result;
};

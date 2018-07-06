import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

import { IConfiguration } from "@bob/core/IConfiguration";
import { log } from "@bob/utils/log";

export function html(configuration: IConfiguration) {
    const config: any = {};

    let options: any = {};

    if (configuration.plugins != null && configuration.plugins.html != null) {
        options = configuration.plugins.html;
    }

    const title = options.title || "Title";
    config.title = configuration.production ? title : `${title} - Dev`;

    config.filename = configuration.serve ? "index.html" : "../index.html";

    log.info("Creating html file named", config.filename, "with title", config.title);

    config.inject = true;

    if (options.template != null) {
        config.template = path.resolve(options.template);
    }

    return new HtmlWebpackPlugin(config);
}

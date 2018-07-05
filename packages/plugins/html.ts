import * as HtmlWebpackPlugin from "html-webpack-plugin";

import { IConfiguration } from "@bob/core/IConfiguration";
import { log } from "@bob/utils/log";

export function html(configuration: IConfiguration) {
    let options: any = {};

    if (configuration.plugins != null && configuration.plugins.html != null) {
        options = configuration.plugins.html;
    }

    let filename = null;
    const title = options.title || "Title";

    if (typeof options.filename === "string") {
        filename = options.filename;
    } else if (Array.isArray(options.filename) && options.filename.length === 2) {
        filename = configuration.production ? options.filename[1] : options.filename[0];
    } else {
        filename = "index.html";
    }

    log.info("Creating html file named", filename, "with title", title);

    return new HtmlWebpackPlugin({
        filename,
        inject: true,
        title: configuration.production ? title : `${title} - Dev`,
    });
}

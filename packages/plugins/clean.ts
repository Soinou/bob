import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as path from "path";

import { IConfiguration } from "@bob/core/IConfiguration";
import { log } from "@bob/utils/log";

export function clean({ plugins, target }: IConfiguration) {
    const options: any = plugins == null ? {} : plugins.clean || {};

    const directories: string[] = [];

    if (target === "web") {
        directories.push(path.resolve("public/assets"));
    } else if (target === "node") {
        directories.push(path.resolve("bin"));
    } else {
        // ???
    }

    if (options.paths != null) {
        directories.push(options.paths.map((p: string) => path.resolve(p)));
    }

    const exclude: string[] = options.exclude || [];

    log.info("Cleaning directories [", directories.join(", "), "] but excluding files [", exclude.join(", "), "]");

    return new CleanWebpackPlugin(directories, {
        exclude,
        root: process.cwd(),
        verbose: false,
    });
}

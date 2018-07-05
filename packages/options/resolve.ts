import * as path from "path";
import * as webpack from "webpack";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";
import { log } from "@bob/utils/log";

export const resolve: IOption<webpack.Resolve> = ({ alias, loaders, namespace }: IConfiguration) => {
    const extensions: string[] = [".js"];
    const modules: string[] = [];
    const aliases = {
        // Add user defined aliases
        ...alias,

        // Namespace is aliases to the packages directory
        [namespace]: path.resolve("packages"),
    };

    if (loaders != null && Array.isArray(loaders) && loaders.length > 0) {
        if (loaders.includes("css")) {
            extensions.push(".css");
        }

        if (loaders.includes("handlebars")) {
            extensions.push(".hbs");
        }

        if (loaders.includes("stylus")) {
            extensions.push(".styl");
        }

        if (loaders.includes("typescript")) {
            extensions.push(".ts", ".tsx");
        }
    }

    modules.push(path.resolve("node_modules"), path.resolve("packages"));

    return { alias: aliases, extensions, modules };
};

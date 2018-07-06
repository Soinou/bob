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
        // Typescript is always first
        if (loaders.includes("typescript")) {
            extensions.push(".ts", ".tsx");
        }

        // Then css
        if (loaders.includes("css")) {
            extensions.push(".css");
        }

        // Then stylus
        if (loaders.includes("stylus")) {
            extensions.push(".styl");
        }

        // Then sass
        if (loaders.includes("sass")) {
            extensions.push(".sass", ".scss");
        }

        // And finally handlebars (Mostly for webpack-html-plugin templates)
        if (loaders.includes("handlebars")) {
            extensions.push(".hbs");
        }
    }

    modules.push(path.resolve("node_modules"), path.resolve("packages"));

    return { alias: aliases, extensions, modules };
};

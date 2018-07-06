import * as webpack from "webpack";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";
import { css } from "@bob/loaders/css";
import { handlebars } from "@bob/loaders/handlebars";
import { sass } from "@bob/loaders/sass";
import { stylus } from "@bob/loaders/stylus";
import { typescript } from "@bob/loaders/typescript";
import { log } from "@bob/utils/log";

export const rules: IOption<webpack.RuleSetRule[]> = (configuration: IConfiguration) => {
    return configuration.loaders
        .map(loader => {
            switch (loader) {
                case "css":
                    return css(configuration);
                case "handlebars":
                    return handlebars(configuration);
                case "sass":
                    return sass(configuration);
                case "stylus":
                    return stylus(configuration);
                case "typescript":
                    return typescript(configuration);
                default:
                    log.warn(`Unrecognized loader "${loader}" in [module.loaders]`);
                    return null;
            }
        })
        .filter(rule => rule != null);
};

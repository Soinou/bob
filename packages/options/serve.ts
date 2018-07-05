import chalk from "chalk";
import * as history from "connect-history-api-fallback";
import * as convert from "koa-connect";
import { Options } from "webpack-serve";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";
import { log } from "@bob/utils/log";

export const serve: IOption<Options> = (configuration: IConfiguration) => {
    if (configuration.serve == null) {
        return {};
    }

    const result: any = {};
    const options: any = configuration.serve || {};
    const host: any = options.host || {};
    const hot: any = options.hot || {};

    const content = ["public/assets"];

    if (options.content != null) {
        content.push(...options.content);
    }

    result.clipboard = false;
    result.host = host.server || "0.0.0.0";
    result.hot = {
        host: {
            client: hot.clientHost || hot.host || "127.0.0.1",
            server: hot.serverHost || hot.host || "0.0.0.0",
        },
        logLevel: "warn",
        port: hot.port || 8081,
    };
    result.content = content;
    result.logLevel = "warn";
    result.port = options.port || 8080;
    result.dev = {
        index: "index.html",
        logLevel: "silent",
        publicPath: "/assets/",
    };

    result.add = (app: any, middleware: any) => {
        const historyOptions = {
            index: "/assets/index.html",
        };

        app.use(convert(history(historyOptions)));
    };

    log.info("Development server listening on", chalk.yellow.bold(`${result.host}:${result.port}`));
    log.info(
        "Development websocket listening on",
        chalk.yellow.bold(`${result.hot.host.server}:${result.hot.port}`),
        "and using",
        chalk.yellow.bold(`${result.hot.host.client}:${result.hot.port}`),
        "on the client side",
    );

    return result;
};

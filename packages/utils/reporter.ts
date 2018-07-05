import chalk from "chalk";
import * as webpack from "webpack";

import { log } from "./log";

export function reporter(error: Error, stats: webpack.Stats & any, customTime?: number) {
    if (error) {
        log.error("Build failed");

        log.error("Error:", error.stack || error);

        const details = (error as any).details;

        if (details) {
            log.error("Details:", details);
        }

        return;
    }

    const info = stats.toJson("verbose");

    const time = customTime || info.time;

    if (stats.compilation && stats.compilation.errors.length !== 0) {
        log.error("Build failed after", chalk.yellow.bold(`${time}ms`));

        stats.compilation.errors.forEach((e: Error) => {
            log.error(chalk.red.bold(e.message));
        });
    } else if (stats.hasErrors()) {
        log.error("Build failed after", chalk.yellow.bold(`${time}ms`));

        reportErrors(info.errors);
    } else {
        reportJson(info, customTime);
    }

    if (stats.hasWarnings()) {
        reportWarnings(info.warnings);
    }

    // Rest
}

export function reportJson(json: any, customTime?: number) {
    const time = customTime || json.time;

    log.success("Build done after", chalk.yellow.bold(`${time}ms`), chalk.grey(`(${json.hash})`));

    json.assets.forEach((asset: any) => {
        const { emitted, name, chunkNames, size } = asset;

        if (chunkNames.length > 0) {
            let outputSize = size;
            let outputUnit = "B";

            if (size > 1048576) {
                outputSize = (size / 1048576).toFixed(2);
                outputUnit = "MB";
            } else if (size > 1024) {
                outputSize = (size / 1024).toFixed(2);
                outputUnit = "kB";
            }

            const formattedSize = chalk.yellow.bold(`${outputSize}${outputUnit}`);

            log.info(`- ${chalk.blueBright(name)}: ${formattedSize}`);
        }
    });
}

export function reportErrors(errors: string[]) {
    errors.forEach((e: string) => {
        const index = e.indexOf("\n");

        if (index === -1) {
            log.error(chalk.red.bold(`in ${e}`));
        } else {
            log.error(chalk.red.bold(`in ${e.substring(0, index)}`));
        }
    });
}

export function reportWarnings(warnings: string[]) {
    warnings.forEach((w: string) => {
        log.warn(chalk.yellow.bold(`in ${w}`));
    });
}

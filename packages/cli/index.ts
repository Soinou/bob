import "source-map-support/register";

import chalk from "chalk";
import * as fs from "fs-extra-promise";
import * as path from "path";
import * as toml from "toml";
import * as yargs from "yargs";

import { Builder } from "@bob/core/Builder";
import { IConfiguration } from "@bob/core/IConfiguration";
import { log } from "@bob/utils/log";

async function main() {
    yargs.options({
        analyzer: {
            default: false,
            describe: "If the bundle analyzer plugin should be used",
            type: "boolean",
        },
        config: {
            default: "bobfile.toml",
            describe: "Uses the given configuration file to build",
            type: "string",
        },
        production: {
            default: false,
            describe: "Builds in production mode",
            type: "boolean",
        },
        serve: {
            default: false,
            describe: "Setups a development server",
            type: "boolean",
        },
        watch: {
            default: false,
            describe: "Builds in watch mode",
            type: "boolean",
        },
    });

    const argv = yargs.argv;

    const analyzer = argv.analyzer;
    const production = argv.production;
    const serve = argv.serve;
    const watch = argv.watch;

    let configFile = null;
    let configFileName = null;

    configFile = path.resolve(argv.config);
    configFileName = argv.config;

    if (!(await fs.existsAsync(configFile))) {
        log.error(`Config file "${configFileName}" does not exist`);
        process.exit(1);
    }

    log.info("Using config file", configFileName);

    if (production) {
        log.info("Production mode enabled");
    }

    if (serve) {
        log.info("Development server mode enabled");
    } else if (watch) {
        log.info("Watch mode enabled");
    }

    const buffer = await fs.readFileAsync(configFile);

    try {
        const data: IConfiguration = toml.parse(buffer.toString());

        data.analyzer = analyzer;
        data.production = production;
        data.watch = watch;

        // Serve mode disabled, remove serve options
        if (!serve) {
            data.serve = null;
        } else if (data.target === "node") {
            log.error("Cannot use development server mode when targeting node");
            process.exit(1);
        } else if (data.serve == null) {
            data.serve = {};
        }

        const builder = new Builder(data);

        builder.build();
    } catch (error) {
        if (error.name === "SyntaxError") {
            log.error(
                "Parsing error on line",
                error.line,
                "column",
                error.column,
                "of file",
                configFileName,
                ":",
                error.message,
            );
        } else {
            log.error(chalk.red(`Uncaught error:\n${error.stack}`));
        }
        process.exit(1);
    }
}

main().catch(console.error);

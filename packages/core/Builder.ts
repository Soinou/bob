import * as webpack from "webpack";

import { create } from "@bob/options/create";
import { log } from "@bob/utils/log";
import { reporter } from "@bob/utils/reporter";

import { DevServer } from "./DevServer";
import { IConfiguration } from "./IConfiguration";

export class Builder {
    public constructor(private configuration: IConfiguration) {}

    public build() {
        const options = create(this.configuration);

        try {
            const compiler = webpack(options);

            if (this.configuration.serve) {
                log.start("Starting development server...");
                const server = new DevServer();

                server.start(compiler, this.configuration);
            } else if (this.configuration.watch) {
                log.start("Watching...");
                compiler.watch({ ignored: /node_modules/ }, reporter);
            } else {
                log.start("Building...");
                compiler.run((error, stats) => {
                    const errored = reporter(error, stats);

                    if (errored) {
                        process.exit(1);
                    }
                });
            }
        } catch (error) {
            if (error.name === "WebpackOptionsValidationError") {
                log.error(error.message);
            } else {
                throw error;
            }
        }
    }
}

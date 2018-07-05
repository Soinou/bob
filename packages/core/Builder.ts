import * as webpack from "webpack";
import * as serve from "webpack-serve";

import { IConfiguration } from "./IConfiguration";

import { create } from "@bob/options/create";
import { log } from "@bob/utils/log";
import { reporter } from "@bob/utils/reporter";

export class Builder {
    public constructor(private configuration: IConfiguration) {}

    public build() {
        const options = create(this.configuration);

        try {
            const compiler = webpack(options);

            if (this.configuration.serve) {
                log.start("Starting development server...");
                serve({ compiler }).then(server => {
                    let startTime: Date = null;

                    server.on("build-started", () => {
                        startTime = new Date();
                    });

                    server.on("build-finished", ({ stats }) => {
                        const endTime: Date = new Date();

                        const time = endTime.valueOf() - startTime.valueOf();

                        reporter(null, stats, time);
                    });
                });
            } else if (this.configuration.watch) {
                log.start("Watching...");
                compiler.watch({ ignored: /node_modules/ }, reporter);
            } else {
                log.start("Building...");
                compiler.run(reporter);
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

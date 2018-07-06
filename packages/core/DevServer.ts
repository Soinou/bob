import * as history from "connect-history-api-fallback";
import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as webpack from "webpack";
import * as devMiddleware from "webpack-dev-middleware";
import * as hotMiddleware from "webpack-hot-middleware";

import { IConfiguration } from "@bob/core/IConfiguration";
import { log } from "@bob/utils/log";
import { reporter } from "@bob/utils/reporter";

export class DevServer {
    private app: express.Express;
    private server: http.Server;

    public constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
    }

    public start(compiler: webpack.Compiler, configuration: IConfiguration) {
        const { serve } = configuration;

        const port = serve.port || 8080;
        const host = serve.host || "0.0.0.0";

        this.app.use(history({ index: "/assets/index.html" }));

        this.app.use(
            devMiddleware(compiler, {
                logLevel: "silent",
                publicPath: "/assets/",
                reporter: (/* middlewareOptions */ _, options) => {
                    const { state, stats } = options;

                    if (state) {
                        reporter(null, stats);
                    } else {
                        log.info("Compiling...");
                    }
                },
            }),
        );

        this.app.use(
            hotMiddleware(compiler, {
                log: false,
            }),
        );

        this.app.use(express.static(path.resolve("public")));

        if (serve.content != null && serve.content.length > 0) {
            serve.content.forEach(directory => this.app.use(express.static(path.resolve(directory))));
        }

        this.server.listen(port, host, () => {
            log.info(`Development server listening on ${host}:${port}`);
        });
    }
}

import * as history from "connect-history-api-fallback";
import * as convert from "koa-connect";
import * as path from "path";

export function serve(port: number, hmrPort: number, publicPath: string) {
    return {
        clipboard: false,
        content: path.resolve("public"),
        devMiddleware: {
            index: "/assets/index.html",
            logLevel: "warn",
            publicPath,
        },
        host: "0.0.0.0",
        hotClient: {
            host: {
                client: "127.0.0.1",
                server: "0.0.0.0",
            },
            https: false,
            port: hmrPort,
        },
        port,

        add: (app: any, middleware: any, options: any) => {
            middleware.content();
            middleware.webpack();

            app.use(convert(history({ index: "/assets/index.html" })));
        },
    };
}

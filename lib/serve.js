"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var history = require("connect-history-api-fallback");
var convert = require("koa-connect");
var path = require("path");
function serve(port, hmrPort, publicPath) {
    return {
        clipboard: false,
        content: path.resolve("public"),
        devMiddleware: {
            index: "/assets/index.html",
            logLevel: "warn",
            publicPath: publicPath,
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
        port: port,
        add: function (app, middleware, options) {
            middleware.content();
            middleware.webpack();
            app.use(convert(history({ index: "/assets/index.html" })));
        },
    };
}
exports.serve = serve;
//# sourceMappingURL=serve.js.map
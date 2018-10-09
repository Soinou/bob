"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function devServer(port, publicHost, publicPath) {
    return {
        clientLogLevel: "warning",
        contentBase: path.resolve("public"),
        historyApiFallback: {
            index: "/assets/index.html",
            verbose: true,
        },
        host: "0.0.0.0",
        index: "/assets/index.html",
        inline: true,
        open: false,
        overlay: true,
        port: port,
        public: publicHost,
        publicPath: publicPath,
    };
}
exports.devServer = devServer;
//# sourceMappingURL=devServer.js.map
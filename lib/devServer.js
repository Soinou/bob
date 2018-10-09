"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function devServer(port, publicPath) {
    return {
        clientLogLevel: "warning",
        compress: true,
        contentBase: path.resolve("public"),
        historyApiFallback: {
            index: "/assets/index.html",
        },
        host: "0.0.0.0",
        hot: true,
        index: "/assets/index.html",
        inline: true,
        open: false,
        overlay: true,
        port: port,
        public: publicPath,
    };
}
exports.devServer = devServer;
//# sourceMappingURL=devServer.js.map
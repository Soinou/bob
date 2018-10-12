"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
function analyzer(serve, port) {
    if (port === void 0) { port = 8888; }
    return new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
        analyzerHost: "0.0.0.0",
        analyzerMode: serve ? "server" : "static",
        logLevel: "error",
        openAnalyzer: false,
        port: port,
    });
}
exports.analyzer = analyzer;
//# sourceMappingURL=analyzer.js.map
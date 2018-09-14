"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
function analyzer() {
    return new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
        analyzerHost: "0.0.0.0",
        logLevel: "error",
        openAnalyzer: false,
    });
}
exports.analyzer = analyzer;
//# sourceMappingURL=analyzer.js.map
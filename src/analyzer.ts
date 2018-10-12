import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function analyzer(serve: boolean, port: number = 8888) {
    return new BundleAnalyzerPlugin({
        analyzerHost: "0.0.0.0",
        analyzerMode: serve ? "server" : "static",
        logLevel: "error",
        openAnalyzer: false,
        port,
    });
}

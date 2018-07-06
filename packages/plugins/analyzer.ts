import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function analyzer() {
    return new BundleAnalyzerPlugin({
        analyzerHost: "0.0.0.0",
        logLevel: "error",
        openAnalyzer: false,
    });
}

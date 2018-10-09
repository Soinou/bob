import * as path from "path";

export function devServer(port: number, publicHost: string, publicPath: string) {
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
        port,
        public: publicHost,
        publicPath,
    };
}

import * as path from "path";

export function devServer(port: number, publicPath: string) {
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
        port,
        public: publicPath,
    };
}

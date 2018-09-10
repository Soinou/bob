import path from "path";
export function output(target, production, directory, publicPath) {
    if (target === "web") {
        return {
            filename: production ? "[name].[chunkhash].js" : "[name].js",
            path: path.resolve(directory),
            publicPath: publicPath,
        };
    }
    else {
        return {
            filename: "[name].js",
            path: path.resolve(directory),
        };
    }
}
//# sourceMappingURL=output.js.map
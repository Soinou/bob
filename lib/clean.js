import CleanWebpackPlugin from "clean-webpack-plugin";
import path from "path";
export function clean(directory, exclude) {
    return new CleanWebpackPlugin([path.resolve(directory)], {
        exclude: exclude,
        root: process.cwd(),
        verbose: false,
    });
}
//# sourceMappingURL=clean.js.map
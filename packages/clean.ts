import CleanWebpackPlugin from "clean-webpack-plugin";
import path from "path";

export function clean(directory: string, exclude: string[]) {
    return new CleanWebpackPlugin([path.resolve(directory)], {
        exclude,
        root: process.cwd(),
        verbose: false,
    });
}

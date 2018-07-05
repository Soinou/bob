import * as os from "os";

import { ILoader } from "../core/ILoader";

export const typescript: ILoader = configuration => {
    const loaders = [];
    const thread = os.cpus().length > 2;

    if (thread) {
        loaders.push("thread-loader");
    }

    loaders.push({
        loader: "ts-loader",
        options: {
            experimentalWatchApi: true,
            happyPackMode: thread,
            onlyCompileBundledFiles: true,
            reportFiles: [],
            silent: true,
            transpileOnly: true,
        },
    });

    return {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: loaders,
    };
};

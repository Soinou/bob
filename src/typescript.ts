export const typescript = (parallel: boolean, hasVue: boolean) => {
    const loaders: any[] = [];

    if (parallel && !hasVue) {
        loaders.push("thread-loader");
    }

    const tsLoaderOptions: any = {
        experimentalWatchApi: true,
        onlyCompileBundledFiles: true,
        reportFiles: [],
        silent: true,
        transpileOnly: true,
    };

    if (hasVue) {
        tsLoaderOptions.appendTsSuffixTo = [/\.vue$/];
    } else if (parallel) {
        tsLoaderOptions.happyPackMode = true;
    }

    loaders.push({
        loader: "ts-loader",
        options: tsLoaderOptions,
    });

    return {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: loaders,
    };
};

export declare const typescript: (parallel: boolean) => {
    exclude: RegExp;
    test: RegExp;
    use: (string | {
        loader: string;
        options: {
            appendTsSuffixTo: RegExp[];
            experimentalWatchApi: boolean;
            happyPackMode: boolean;
            onlyCompileBundledFiles: boolean;
            reportFiles: never[];
            silent: boolean;
            transpileOnly: boolean;
        };
    })[];
};

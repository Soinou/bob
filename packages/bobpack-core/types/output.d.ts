export declare function output(target: string, production: boolean, directory: string, publicPath?: string): {
    filename: string;
    path: string;
    publicPath: string | undefined;
} | {
    filename: string;
    path: string;
    publicPath?: undefined;
};

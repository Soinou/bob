export declare function devServer(port: number, publicHost: string, publicPath: string): {
    clientLogLevel: string;
    contentBase: string;
    historyApiFallback: {
        index: string;
        verbose: boolean;
    };
    host: string;
    index: string;
    inline: boolean;
    open: boolean;
    overlay: boolean;
    port: number;
    public: string;
    publicPath: string;
};

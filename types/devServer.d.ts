export declare function devServer(port: number, publicPath: string): {
    clientLogLevel: string;
    compress: boolean;
    contentBase: string;
    historyApiFallback: {
        index: string;
    };
    host: string;
    hot: boolean;
    index: string;
    inline: boolean;
    open: boolean;
    overlay: boolean;
    port: number;
    public: string;
};

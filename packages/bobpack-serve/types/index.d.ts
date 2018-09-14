export declare function serve(port: number, hmrPort: number, publicPath: string): {
    clipboard: boolean;
    content: string;
    devMiddleware: {
        index: string;
        logLevel: string;
        publicPath: string;
    };
    host: string;
    hotClient: {
        host: {
            client: string;
            server: string;
        };
        https: boolean;
        port: number;
    };
    port: number;
    add: (app: any, middleware: any, options: any) => void;
};

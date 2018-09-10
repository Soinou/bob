import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
export function html(serve, template) {
    return new HtmlWebpackPlugin({
        filename: serve ? "index.html" : "../index.html",
        inject: true,
        template: path.resolve(template),
    });
}
//# sourceMappingURL=html.js.map
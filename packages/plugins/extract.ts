import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

export function extract() {
    return new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" });
}

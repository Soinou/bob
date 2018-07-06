import { ILoader } from "@bob/core/ILoader";

export const handlebars: ILoader = configuration => ({
    loader: "handlebars-loader",
    test: /\.hbs$/,
});

import * as path from "path";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";

export const entries: IOption<any> = ({ entry, serve, target }: IConfiguration) => {
    const modules = [path.resolve("packages", entry)];

    if (serve) {
        modules.push("webpack-hot-middleware/client?reload=true&name=Bob");
    }

    return {
        [target === "web" ? "app" : "index"]: modules,
    };
};

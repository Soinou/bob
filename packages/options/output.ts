import * as path from "path";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";
import { log } from "@bob/utils/log";

export const output: IOption<any> = ({ production, target }: IConfiguration) => {
    const result: any = {
        pathinfo: production,
    };

    if (production && target === "web") {
        result.filename = "[name].[chunkhash].js";
    } else {
        result.filename = "[name].js";
    }

    // No output, default to public/assets for web and bin for node
    if (target === "web") {
        result.path = path.resolve("public/assets");
        result.publicPath = "/assets/";
    } else if (target === "node") {
        result.path = path.resolve("bin");
    } else {
        // ???
    }

    return result;
};

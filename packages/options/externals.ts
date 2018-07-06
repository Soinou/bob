import * as nodeExternals from "webpack-node-externals";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";

export const externals: IOption<any> = ({ externals: ext, target }: IConfiguration) => {
    if (target === "node") {
        return [nodeExternals()];
    } else {
        return ext;
    }
};

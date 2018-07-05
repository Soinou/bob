import * as path from "path";

import { IConfiguration } from "@bob/core/IConfiguration";
import { IOption } from "@bob/core/IOption";

export const entries: IOption<any> = ({ entry, target }: IConfiguration) => ({
    [target === "web" ? "app" : "index"]: [path.resolve("packages", entry)],
});

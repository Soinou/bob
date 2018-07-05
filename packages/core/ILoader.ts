import * as webpack from "webpack";

import { IConfiguration } from "./IConfiguration";

export type ILoader = (configuration: IConfiguration) => webpack.RuleSetRule;

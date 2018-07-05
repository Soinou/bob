import { IConfiguration } from "@bob/core/IConfiguration";

export type IOption<T> = (configuration: IConfiguration) => T;

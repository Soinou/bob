import { Signale } from "signale";

export const log = new Signale();

log.config({
    displayDate: false,
    displayTimestamp: true,
});

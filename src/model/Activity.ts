import { ActivityDataPoint } from "./ActivityDataPoint";
import { parseAsNumberOrNull } from "../lib/typeParsers";

export interface Activity {
    name: string;
    date: string;
    type: number | null;
    activityDataPoints: ActivityDataPoint[];
}

export function createActivity(
    name: string,
    date: string,
    type: any,
    activityDataPoints: ActivityDataPoint[]
): Activity {
    return {
        name,
        date,
        type: parseAsNumberOrNull(type),
        activityDataPoints,
    };
}

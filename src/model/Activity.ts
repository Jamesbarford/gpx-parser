import { ActivityDataPoint } from "./ActivityDataPoint";
import { parseAsNumberOrNull } from "../lib/typeParsers";

export interface Activity {
    activityName: string;
    activityDate: string;
    activityType: number | null;
    activityDataPoints: ActivityDataPoint[];
}

export function createActivity(
    activityName: string,
    activityDate: string,
    activityType: any,
    activityDataPoints: ActivityDataPoint[]
): Activity {
    return {
        activityName,
        activityDate,
        activityType: parseAsNumberOrNull(activityType),
        activityDataPoints,
    };
}

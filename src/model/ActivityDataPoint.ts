import { parseAsNumberOrNull, parseAsStringOrUndefined } from "../lib/typeParsers";

export interface ActivityDataPoint {
    latitude: number | null;
    longitude: number | null;
    timestamp: string | undefined;
    elevation: number | null;
    heartRate: number | null;
    cadence: number | null;
}

export function createActivityDataPoint(
    lat: any,
    longitude: any,
    timestamp: any,
    elevation?: any,
    heartRate?: any,
    cadence?: any
): ActivityDataPoint {
    return {
        latitude: parseAsNumberOrNull(lat),
        longitude: parseAsNumberOrNull(longitude),
        timestamp: parseAsStringOrUndefined(timestamp),
        elevation: parseAsNumberOrNull(elevation),
        heartRate: parseAsNumberOrNull(heartRate),
        cadence: parseAsNumberOrNull(cadence),
    };
}

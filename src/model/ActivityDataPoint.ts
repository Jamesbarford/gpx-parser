import { parseAsNumberOrNull, parseAsStringOrUndefined } from "../lib/typeParsers";

export interface ActivityDataPoint {
    lat: number | null;
    lon: number | null;
    timestamp: string | undefined;
    elevation: number | null;
    hr: number | null;
    cad: number | null;
}

export function createActivityDataPoint(
    lat: any,
    lon: any,
    timestamp: any,
    elevation?: any,
    hr?: any,
    cad?: any
): ActivityDataPoint {
    return {
        lat: parseAsNumberOrNull(lat),
        lon: parseAsNumberOrNull(lon),
        timestamp: parseAsStringOrUndefined(timestamp),
        elevation: parseAsNumberOrNull(elevation),
        hr: parseAsNumberOrNull(hr),
        cad: parseAsNumberOrNull(cad),
    };
}

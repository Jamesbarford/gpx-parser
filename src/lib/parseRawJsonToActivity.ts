import { isNil } from "./util";

import { Activity, createActivity } from "../model/Activity";
import { ActivityDataPoint, createActivityDataPoint } from "../model/ActivityDataPoint";

export function parseRawJsonToActivity(parsedXmlRaw: any): Activity {
    const activityName = getActivityName(parsedXmlRaw);
    const activityDate = getActivityDate(parsedXmlRaw);
    const activityType = getActivityType(parsedXmlRaw);

    const activityDataRaw = getActivityDataRaw(parsedXmlRaw);
    const parsedActivityData = parseRawActivityData(activityDataRaw);

    return createActivity(
        activityName,
        activityDate,
        activityType,
        parsedActivityData
    );
}

function getActivityName(parsedXmlRaw: any): string {
    return parsedXmlRaw?.gpx?.trk?.[0]?.name?.[0] || "No activity name";
}

function getActivityDate(parsedXmlRaw: any): string {
    return parsedXmlRaw?.gpx?.metadata?.[0]?.time?.[0];
}

function getActivityType(parsedXmlRaw: any): number {
    return parsedXmlRaw?.gpx?.trk?.[0]?.type?.[0];
}

function getActivityDataRaw(parsedXmlRaw: any): any[] {
    return parsedXmlRaw?.gpx?.trk?.[0]?.trkseg?.[0]?.trkpt || [];
}

function parseRawActivityData(activityDataRaw: any): ActivityDataPoint[] {
    if (isNil(activityDataRaw)) {
        throw new Error("No data in GPX file");
    }

    return activityDataRaw.reduce((activityDatapoints: ActivityDataPoint[], parsedChunk: any) => {
            try {
                activityDatapoints.push(
                    createActivityDataPoint(
                        getLatitude(parsedChunk),
                        getLongitude(parsedChunk),
                        getTimestamp(parsedChunk),
                        getElevation(parsedChunk),
                        getHeartRate(parsedChunk),
                        getCadence(parsedChunk)
                    )
                );
            } catch (error) {

            }

            return activityDatapoints;
        },
        []
    );
}

const ELEVATION_KEY = "ele";
const HEART_RATE_KEY = "gpxtpx:hr";
const CADENCE_KEY = "gpxtpx:cad";
const DISTANCE_KEY = "$";
const LATITUDE_KEY = "lat";
const LONGITUDE_KEY = "lon";
const EXTENSIONS = "extensions";
const TRACK_POINT_EXTENSION = "gpxtpx:TrackPointExtension";

function getLatitude(parsedChunk: any): string | undefined {
    return getDistance(parsedChunk, LATITUDE_KEY);
}

function getDistance(parsedChunk: any, key: any): string | undefined {
    return parsedChunk?.[DISTANCE_KEY]?.[key];
}

function getLongitude(parsedChunk: any): string | undefined {
    return getDistance(parsedChunk, LONGITUDE_KEY);
}

function getTimestamp(parsedChunk: any): string | undefined {
    return parsedChunk?.time?.[0];
}

function getElevation(parsedChunk: any): string | undefined {
    return parsedChunk?.[ELEVATION_KEY]?.[0];
}

function getHeartRate(parsedChunk: any): string | undefined {
    return getTrackPointExtension(parsedChunk, HEART_RATE_KEY);
}

function getTrackPointExtension(parsedChunk: any, key: string): string | undefined {
    return parsedChunk?.[EXTENSIONS]?.[0]?.[TRACK_POINT_EXTENSION]?.[0]?.[key]?.[0];
}

function getCadence(parsedChunk: any): string | undefined {
    return getTrackPointExtension(parsedChunk, CADENCE_KEY);
}

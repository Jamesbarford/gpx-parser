# Gpx parser

This takes a GPX file fro mGarmin or strava and converts it into a simple to JSON structure

The output is follows:

```ts
interface Activity {
    activityName: string;
    activityDate: string;
    activityType: number | null;
    activityDataPoints: ActivityDataPoint[];
}

interface ActivityDataPoint {
    latitude: number | null;
    longitude: number | null;
    timestamp: string | undefined;
    elevation: number | null;
    heartRate: number | null;
    cadence: number | null;
}
```
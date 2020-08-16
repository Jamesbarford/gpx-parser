# Gpx parser

This takes a GPX file from i.e Garmin or Strava and converts it into a simple to JSON structure

## Output:

```ts
{
    name: string;
    date: string;
    activityType: number | null;
    activityDataPoints: Array<{
        latitude: number | null;
        longitude: number | null;
        timestamp: string | undefined;
        elevation: number | null;
        heartRate: number | null;
        cadence: number | null;
    }>
}
```

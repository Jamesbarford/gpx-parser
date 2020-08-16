# GPX Parser Lite 🥳

A lightweight GPX parser

Can either parse a file given a file path or can parse a GPX string. A GPX file is essentially XML.

## How to install 😱

```
npm install --save gpx-parser-lite
```

## Output 💾

There are two main functions `parseGPXString` and `parseGPXFile`. The output for both is the same:

```ts
interface Activity {
    name: string;
    date: string; // an ISO DATE
    type: number; // 9 is run 🤷‍♂️
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

## Example 🤺

### parseGPXString

The context for usage would be along the lines of a perhaps form submittal, where a `FileReader` can get the file as a string.

```ts
import { parseGPXString, Activity } from "gpx-parser-lite";

const activity: Activity = parseGPXString(GPX_STRING);
```

### parseGPXFile

The environment here would be node, possibly where the file path could be passed in as a command line argument

```ts
import { parseGPXString, Activity } from "gpx-parser-lite";

parseGPXString(GPX_FILE_PATH, (err, activity) => {
    // do something with activity
});
```

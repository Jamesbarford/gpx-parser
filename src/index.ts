import fs from "fs";
import { Parser } from "xml2js";

import { parseRawJsonToActivity } from "./lib/parseRawJsonToActivity";
import { Activity } from "./model/Activity";
import { ActivityDataPoint } from "./model/ActivityDataPoint";

async function parseGPXString(gpxFile: any): Promise<Activity | undefined> {
    const xmlParser = new Parser();

    if (typeof gpxFile === "string") {
        const parsedXmlRaw = await xmlParser.parseStringPromise(gpxFile);
        if (!parsedXmlRaw) return;
        return parseRawJsonToActivity(parsedXmlRaw);
    } else {
        throw new Error(`Expected argument to be a string instead received: ${gpxFile}`);
    }
}

interface NodeCallback {
    (err: any | null, result?: any): void;
}

// this seems slightly academic
function parseGPXFile(gpxFilePath: any, callback?: NodeCallback): void {
    const xmlParser = new Parser();

    fs.readFile(gpxFilePath, (err, data) => {
        if (err) return callback?.(err);

        xmlParser.parseString(data, (err: any, parsedXmlRaw: any) => {
            if (err) return callback?.(err);

            callback?.(null, parseRawJsonToActivity(parsedXmlRaw));
        });
    });
}

export {Activity, ActivityDataPoint, NodeCallback, parseGPXString, parseGPXFile}

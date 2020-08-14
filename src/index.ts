import fs from "fs";
import util from "util";
import { Parser } from "xml2js";

import { parseRawJsonToActivity } from "./lib/parseRawJsonToActivity";
import { log } from "./lib/util";

export async function parseGPXString(gpxFile: any) {
    const xmlParser = new Parser();

    if (typeof gpxFile === "string") {
        const parsedXmlRaw = await xmlParser.parseStringPromise(gpxFile);
        if (!parsedXmlRaw) return;
        return parseRawJsonToActivity(parsedXmlRaw);
    } else {
        throw new Error(`Expected argument to be a string instead recieved: ${gpxFile}`);
    }
}

interface NodeCallback {
    (err: any | null, result?: any): void;
}

// this seems slightly academic
export function parseGPXFile(gpxFilePath: any, callback?: NodeCallback): void {
    const xmlParser = new Parser();

    fs.readFile(gpxFilePath, function (err, data) {
        if (err) return callback?.(err);

        xmlParser.parseString(data, function (err: any, parsedXmlRaw: any) {
            if (err) return callback?.(err);

            callback?.(null, parseRawJsonToActivity(parsedXmlRaw));
        });
    });
}


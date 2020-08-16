import { parseGPXFile } from "./src";
import { log } from "./src/lib/util";

function main() {
    parseGPXFile(process?.argv?.[2], (err, res) => {
        if(err) log(err);
        else log(res);
    })
}

main();

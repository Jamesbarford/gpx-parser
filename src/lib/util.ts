import util from "util";

export function isNil(arg: any): arg is null | undefined {
    return arg === null || arg === undefined;
}

export function log(obj: any) {
    console.log(
        util.inspect(obj, { showHidden: false, depth: null, colors: true })
    );
}

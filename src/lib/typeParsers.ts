import { isNil } from "./util";

export function parseAsNumberOrNull(arg: any): number | null {
    if (isNil(arg)) return null;
    const parsedNumber: number = +arg;

    if (isNaN(parsedNumber) || !isFinite(parsedNumber)) return null;

    return parsedNumber;
}

export function parseAsStringOrUndefined(arg: any): string | undefined {
    return isNil(arg) ? undefined : String(arg);
}

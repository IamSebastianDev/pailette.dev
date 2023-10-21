/** @format */

export const payload = <P extends Record<PropertyKey, unknown>>() => {
    return (): P => ({} as P);
};

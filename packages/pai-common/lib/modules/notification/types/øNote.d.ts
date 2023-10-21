/** @format */

export type øNote<N extends string = '', P extends Record<PropertyKey, unknown> = {}> = {
    type: N;
} & {
    [Key in keyof P]: P[Key];
};

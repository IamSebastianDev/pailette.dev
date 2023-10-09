/** @format */

export type ErrorHandler = <T extends Error | null, U = T extends Error ? Error : null>(err: U) => U;

/** @format */

/**
 * @description
 * Utility method to assert the given environment as being in a browser environment.
 * While node does implement a EventTarget interface, it does not work like the browser one.
 *
 * @returns { boolean } true if the environment is browser, false if node
 */

export const assertEnvironment = (): boolean =>
    !(typeof process === 'object' && String(process) === '[object process]');

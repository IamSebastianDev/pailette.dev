/** @format */

import pkg from '../../../../package.json';

export const getVersion = async () => {
    return {
        version: pkg.version,
    };
};

/** @format */

export const tapResponse = <T>(callback: (result: T) => void) => {
    return async (value: T) => {
        callback(value);
        return value;
    };
};

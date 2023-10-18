/** @format */

export const assertResponse = async <T>(value: T): Promise<NonNullable<T>> => {
    if (!value) {
        throw new Error();
    }

    return value;
};

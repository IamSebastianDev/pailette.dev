/** @format */

export const request = async <T>(resource: string, init: RequestInit = {}): Promise<T> => {
    const response = await fetch(resource, init);
    const { data } = await response.json();

    return data as T;
};

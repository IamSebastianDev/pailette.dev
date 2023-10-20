/** @format */

export const handleError = (handler?: (error: unknown) => void) => {
    return (error: unknown) => {
        handler?.(error);
        return null;
    };
};

/** @format */

export const retry = async <T extends (...args: unknown[]) => any>(
    action: T,
    maxRetries: number = 10,
    retryCount: number = 1
): Promise<Awaited<ReturnType<T>>> => {
    try {
        return await action();
    } catch (error: unknown) {
        if (retryCount > maxRetries) {
            throw error;
        }
        return retry(action, maxRetries, retryCount + 1);
    }
};

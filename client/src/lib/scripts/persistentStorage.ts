/** @format */

export const persistentStorage = <T>(key: string, namespace: string = 'pailette') => {
    type StorageSetter = (data: T) => void;
    type StorageGetter = () => T;
    type StorageRemover = () => void;
    type Callback = (methods: { set: StorageSetter; get: StorageGetter; remove: StorageRemover }) => void;

    const identifier = `${namespace}:${key}`;

    const connectCallbacks: Callback[] = [];
    const disconnectCallbacks: Callback[] = [];

    const get = (): T => {
        return JSON.parse(localStorage.getItem(identifier) ?? '{}');
    };
    const set = (data: T): void => {
        localStorage.setItem(identifier, JSON.stringify(data)) as T;
    };
    const remove = (): void => {
        localStorage.removeItem(identifier);
    };

    window.addEventListener('load', () => {
        connectCallbacks.forEach((callback) =>
            callback({
                get,
                set,
                remove,
            })
        );
    });

    window.addEventListener('beforeunload', () => {
        disconnectCallbacks.forEach((callback) =>
            callback({
                get,
                set,
                remove,
            })
        );
    });

    return {
        connectCallback: (handler: Callback) => {
            connectCallbacks.push(handler);
        },
        disconnectCallback: (handler: Callback) => {
            disconnectCallbacks.push(handler);
        },
        get,
        set,
        remove,
    };
};

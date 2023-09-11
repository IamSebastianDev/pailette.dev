/** @format */

export const excludeField = <Entity extends Record<PropertyKey, unknown>, Key extends keyof Entity>(
    entity: Entity,
    ...keys: Key[]
): Omit<Entity, Key> => {
    return Object.fromEntries(Object.entries(entity).filter(([key]) => !keys.includes(key as Key))) as Omit<
        Entity,
        Key
    >;
};

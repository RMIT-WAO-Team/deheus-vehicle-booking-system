export function safeAssign<T extends object, U extends object>(target: T, source: U): T {
    Object.entries(source).forEach(([key, value]) => {
        if (value !== undefined) {
            (target as any)[key] = value;
        }
    });

    return target;
}

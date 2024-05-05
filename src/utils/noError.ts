export default <T extends (...args: any[]) => any>(fn: T, default_value: any = undefined): T => {
    return ((...args: any[]) => {
        try {
            return fn(...args);
        } catch (error) {
            console.error(error);
            return default_value;
        }
    }) as unknown as T;
};
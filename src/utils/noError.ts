export default <T extends (...args: any[]) => any>(
    fn: T,
    default_value: any = undefined,
    print: boolean = false
): T => {
    return ((...args: any[]) => {
        try {
            return fn(...args);
        } catch (error) {
            if (print) console.error(error);
            return default_value;
        }
    }) as unknown as T;
};
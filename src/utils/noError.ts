export default <T extends (...args: any[]) => any>(fn: T): T => {
    return ((...args: any[]) => {
        // catch the errors raised in fn
        try {
            fn(...args);
        } catch (error) {
            console.error(error);
        }
    }) as unknown as T;
};
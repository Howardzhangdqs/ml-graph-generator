export default <T>(fn: T): T => {
    (fn as unknown as Function)();
    return fn;
};
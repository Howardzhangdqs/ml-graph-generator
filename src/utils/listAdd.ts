export default <T>(list1: T, list2: number[]): T => {
    return (list1 as number[]).map((val, index) => {
        return val + list2[index];
    }) as unknown as T;
};
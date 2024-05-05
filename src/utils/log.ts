export default (...args: any[]) => {
    if (import.meta.env.VITE_LOG == true) console.log(...args);
};
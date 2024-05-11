import noError from "./noError";

/**
 * Attaches a resize listener to the specified element and invokes the callback function whenever the element is resized.
 * @param el - The element to attach the resize listener to.
 * @param resize_callback - The callback function to be invoked when the element is resized.
 * @returns A function that can be called to remove all the listeners attached by this function.
 * @example
 * ```ts
 * onMounted(() => {
 *     onUnmounted(
 *         resizeListener(dom as HTMLElement, () => {
 *             // some code here
 *         })
 *     );
 * });
 * ```
 * NEVER NEVER NEVER code like this or you will waste a day debugging it:
 * ```diff
 *   resizeListener(dom as HTMLElement, () => {
 *       // some code here
 * - })()
 * + })
 * ```
 */
export default noError((
    el: HTMLElement,
    resize_callback: () => void,
): () => any => {
    // use any here to avoid TypeScript error in onUnmounted
    // which requires a function which returns type any

    resize_callback = noError(resize_callback);

    window.addEventListener("resize", resize_callback);

    const resizeObserver = new ResizeObserver(resize_callback);
    resizeObserver.observe(el);

    resize_callback();

    setTimeout(resize_callback, 500);
    
    return () => {
        window.removeEventListener("resize", resize_callback);

        resizeObserver.unobserve(el);
    };
});
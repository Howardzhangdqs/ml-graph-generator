import noError from "./noError";

export default noError((
    svg: { value: HTMLElement },
    target: { value: { el: HTMLElement } }
) => {

    console.log(svg.value, target.value.el);
    svg.value.innerHTML = "";
    svg.value.style.height = `${target.value.el.parentElement?.clientHeight}px`;
    svg.value.style.width = `${target.value.el.parentElement?.clientWidth}px`;
});
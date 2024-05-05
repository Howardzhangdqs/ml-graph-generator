import DrawArrow, { type Point } from "./DrawArrow";

const svgdom = document.createElement("svg") as unknown as SVGSVGElement;

svgdom.setAttribute("class", "mask");

document.body.appendChild(svgdom);

export default (
    startingPoint: Point,
    endingPoint: Point,
    routine: Point[] | "direct" = "direct",
    radius: number = 10,
    arrow: boolean = true,
    convex: boolean = false,
) => {
    DrawArrow(
        svgdom,
        startingPoint,
        endingPoint,
        routine,
        radius,
        arrow,
        convex,
    );
};
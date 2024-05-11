import DrawArrow, { type Point } from "@/components/comp/DrawArrow";
import noError from "./noError";

/**
 * A utility function that creates and draws an arrow on an SVG element.
 * @param svgdom - The SVG element to draw the arrow on.
 * @returns A function that can be used to draw an arrow on the SVG element.
 */
export default (
    svgdom: SVGSVGElement,
) => {

    /**
     * Draws an arrow on an SVG element from a starting point to an ending point.
     * 
     * @param startingPoint - The starting point of the arrow.
     * @param endingPoint - The ending point of the arrow.
     * @param routine - The routine of the arrow's path. Can be an array of points or "direct" for a straight line.
     * @param radius - The radius of the arrow's path curvature.
     * @param arrow - Indicates whether to draw an arrowhead at the ending point.
     * @param convex - Indicates whether the arrow's path should be convex or concave.
     */
    const draw = noError((
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
    });

    const clean = noError(() => {
        while (svgdom.firstChild) {
            svgdom.removeChild(svgdom.firstChild);
        }
    });

    return {
        draw,
        clean,
    };
};
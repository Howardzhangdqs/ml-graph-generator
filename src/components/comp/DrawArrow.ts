import { type KeyPoint } from "../modules/getModulePosition";
import { isEmpty } from "lodash";


export type PointTuple = [number, number];

export type PointDict = {
    x: number, y: number,
};

export type Point = PointTuple;

export type Routine = (PointTuple)[];


/**
 * Converts a relative routine to an absolute routine by calculating the absolute coordinates.
 * @param startingPoint - The starting point of the routine.
 * @param endingPoint - The ending point of the routine.
 * @param routine - The relative routine to be converted.
 * @param convex - A boolean indicating whether the routine should be convex or not.
 * @returns An array containing the absolute routine and the converted routine.
 */
export const Routine2AbsRoutine = (
    startingPoint: Point,
    endingPoint: Point,
    routine: Routine = [],
    convex: boolean = false
): [Point[], Point[]] => {
    const currentPoint = [startingPoint[0], startingPoint[1]];
    const res: Point[] = routine.map((point) => {
        currentPoint[0] += point[0];
        currentPoint[1] += point[1];
        return [currentPoint[0], currentPoint[1]];
    });
    res.push(convex ? [currentPoint[0], endingPoint[1]] : [endingPoint[0], currentPoint[1]]);
    res.push([endingPoint[0], endingPoint[1]]);


    const res2: Point[] = [];

    res2.push([res[0][0] - startingPoint[0], res[0][1] - startingPoint[1]]);
    for (let i = 0; i < res.length - 1; i++) {
        res2.push([res[i + 1][0] - res[i][0], res[i + 1][1] - res[i][1]]);
    }

    return [res, res2];
};


/**
 * Returns -1 if the input number is negative, 1 if the input number is positive,
 * and 0 if the input number is zero.
 * 
 * @param num - The input number.
 * @returns The sign of the input number (-1, 1, or 0).
 */
const Number2PlusMinus = (num: number): (-1 | 1 | 0) => {
    return num > 0 ? 1 : (num < 0 ? -1 : 0);
};


/**
 * Draws an arrow on an SVG element from a starting point to an ending point.
 * 
 * @param svgdom - The SVG element to draw the arrow on.
 * @param startingPoint - The starting point of the arrow.
 * @param endingPoint - The ending point of the arrow.
 * @param routine - The routine of the arrow's path. Can be an array of points or "direct" for a straight line.
 * @param radius - The radius of the arrow's path curvature.
 * @param arrow - Indicates whether to draw an arrowhead at the ending point.
 * @param convex - Indicates whether the arrow's path should be convex or concave.
 */
export default (
    svgdom: SVGSVGElement,
    startingPoint: Point,
    endingPoint: Point,
    routine: Point[] | "direct" = "direct",
    radius: number = 10,
    arrow: boolean = true,
    convex: boolean = false,
) => {

    if (isEmpty(startingPoint) || isEmpty(endingPoint)) return;

    const currentPoint = [startingPoint[0], startingPoint[1]];

    const [route, route2] = (routine !== "direct") ?
        Routine2AbsRoutine(startingPoint, endingPoint, routine, convex) :
        ([
            [endingPoint],
            [[endingPoint[0] - startingPoint[0], endingPoint[1] - startingPoint[1]]]
        ]) as [Point[], Point[]];

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    let d = `M ${currentPoint[0]} ${currentPoint[1]} `;

    for (let i = 0; i < route.length - 1; i++) {
        d += `L ${route[i][0] - Number2PlusMinus(route2[i][0]) * radius} ${route[i][1] - Number2PlusMinus(route2[i][1]) * radius}`;
        const midPointX = route[i][0] + Number2PlusMinus(route2[i + 1][0]) * radius;
        const midPointY = route[i][1] + Number2PlusMinus(route2[i + 1][1]) * radius;
        d += `Q ${route[i][0]} ${route[i][1]}, ${midPointX} ${midPointY} `;
    }

    d += `L ${route[route.length - 1][0]} ${route[route.length - 1][1]}`;

    path.setAttribute("d", d);

    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    svgdom.appendChild(path);

    if (arrow) {
        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");

        const arrowLength = 10;
        const arrowWidth = 5;

        const direction = route2[route2.length - 1];

        const direction_size = Math.sqrt(direction[0] ** 2 + direction[1] ** 2);

        const clipped_direction = [direction[0] / direction_size, direction[1] / direction_size];

        const angle = Math.atan2(clipped_direction[1], clipped_direction[0]) * 180 / Math.PI;

        const arrowPath = `M ${endingPoint[0] - arrowLength} ${endingPoint[1] - arrowWidth} L ${endingPoint[0]} ${endingPoint[1]} L ${endingPoint[0] - arrowLength} ${endingPoint[1] + arrowWidth}`;

        arrow.setAttribute("d", arrowPath);
        arrow.setAttribute("stroke", "black");
        arrow.setAttribute("stroke-width", "2");
        arrow.setAttribute("fill", "none");
        arrow.setAttribute("transform", `rotate(${angle || 0} ${endingPoint[0]} ${endingPoint[1]})`);
        svgdom.appendChild(arrow);
    }
};


export const PointDict2Tuple = (point: PointDict): PointTuple => {
    return [point.x, point.y];
};

export const PointTuple2Dict = (point: PointTuple): PointDict => {
    return { x: point[0], y: point[1] };
};

export const KeyPoint2Tuple = (keyPoint: KeyPoint): PointTuple => {
    return keyPoint.pos;
};

export const KeyPoint2Dict = (keyPoint: KeyPoint): PointDict => {
    return PointTuple2Dict(keyPoint.pos);
};
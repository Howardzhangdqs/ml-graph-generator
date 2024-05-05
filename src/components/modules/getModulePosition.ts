type KeyPointType = "top" | "left" | "right" | "bottom";

export type KeyPoint = {
    type: KeyPointType | string,
    pos: [number, number],
};

export type KeyPoints = KeyPoint[];

export default (dom: HTMLDivElement): KeyPoints => {
    try {
        const rect = dom.getBoundingClientRect();
        return [
            {
                type: "top",
                pos: [rect.left + rect.width / 2, rect.top],
            },
            {
                type: "left",
                pos: [rect.left, rect.top + rect.height / 2],
            },
            {
                type: "right",
                pos: [rect.left + rect.width, rect.top + rect.height / 2],
            },
            {
                type: "bottom",
                pos: [rect.left + rect.width / 2, rect.top + rect.height],
            },
        ];
    } catch {
        return [];
    }
};

export const BoundingClientRect2KeyPoints = (rect: DOMRect, target: KeyPoints): KeyPoints => {

    target.push({
        type: "top",
        pos: [rect.left + rect.width / 2, rect.top],
    });

    target.push({
        type: "left",
        pos: [rect.left, rect.top + rect.height / 2],
    });

    target.push({
        type: "right",
        pos: [rect.left + rect.width, rect.top + rect.height / 2],
    });

    target.push({
        type: "bottom",
        pos: [rect.left + rect.width / 2, rect.top + rect.height],
    });

    return target;
};

export const KeyPoints2Dictionary = (keyPoints: KeyPoints): { [key: string]: [number, number] } => {
    const dict: { [key: string]: [number, number] } = {};
    keyPoints.forEach((keyPoint) => {
        dict[keyPoint.type] = keyPoint.pos;
    });
    return dict;
};
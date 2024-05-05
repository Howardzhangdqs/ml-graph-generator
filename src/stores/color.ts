import { ref } from "vue";
import { defineStore } from "pinia";
import md5 from "md5";
import { random } from "lodash";


const default_color = [
    "#FFCCCC",
    "#FFE5CC",
    "#FFFFCC",
    "#E5FFCC",
    "#CCFFCC",
    "#CCFFE5",
    "#CCFFFF",
    "#CCE5FF",
    "#CCCCFF",
    "#E5CCFF",
    "#FFCCFF",
    "#FFCCE5",
];

const getRandomColor = () => {
    return default_color[random(0, default_color.length - 1)];
};

export const useColorStore = defineStore("color", {
    state: () => {
        return {
            color: new Map(),
        };
    },
    actions: {
        getColor(name: string, color: string | number | undefined = undefined) {
            
            name = md5(name).slice(0, 6);

            if (typeof color == "number") {
                color = default_color[color % default_color.length];
            }

            if (color === undefined) {
                if (this.color.has(name)) {
                    return this.color.get(name);
                } else {
                    const new_color = getRandomColor();
                    this.color.set(name, new_color);
                    return new_color;
                }
            } else {
                this.color.set(name, color);
                return color;
            }
        },
    },
});

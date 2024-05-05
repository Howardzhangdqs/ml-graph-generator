<template>
    <!-- <TrapezoidalShape/> -->
    <div class="encoder-block" ref="refSelf" :class="[`encoder-block-rotate-${props.rotate}`]">
        <div class="triangle" :class="[`triangle1-rotate-${props.rotate}`]"></div>
        <div :class="[`content-rotate-${props.rotate}`]" ref="content">
            <MathDisplay :content="props.name" :math="props.math" />
        </div>
        <div class="triangle" :class="[`triangle2-rotate-${props.rotate}`]"></div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import MathDisplay from "../comp/MathDisplay.vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";

const props = withDefaults(defineProps<{
    /** 模块名 */
    name?: string,

    /** 是否启用数学 */
    math?: boolean,

    color?: string,

    /** 倾斜度 */
    skew?: number,

    /** 旋转角度 */
    rotate?: 0 | 1 | 2 | 3,
}>(), {
    name: "Encoder",
    math: false,
    color: "#6decff",
    skew: 0.2,
    rotate: 0,
});

const content = ref();

const contentWidth = ref(0);
const contentHeight = ref(0);


onMounted(() => {

    const ResizeCallback = () => {
        contentWidth.value = content.value.offsetWidth;
        contentHeight.value = content.value.offsetHeight;
    };

    const resizeObserver = new ResizeObserver(ResizeCallback);

    resizeObserver.observe(content.value as Element);

    ResizeCallback();

    console.log(content.value);

    onUnmounted(() => {
        resizeObserver.unobserve(content.value as Element);
    });
});

const refSelf = ref();

const keypoints = reactive<KeyPoints>([]);

onMounted(() => {

    let domRect: DOMRect;

    const KeyPoint2Rotate = (points: KeyPoints): KeyPoints => {
        if (props.rotate === 0 || props.rotate === 2) {
            return points.map(point => {
                const { type, pos } = point;
                if (point.type == "top") return {
                    type, pos: [pos[0], pos[1] + domRect.height * props.skew * 0.5]
                };
                if (point.type == "bottom") return {
                    type, pos: [pos[0], pos[1] - domRect.height * props.skew * 0.5]
                };
                return point;
            });
        } else {
            return points.map(point => {
                const { type, pos } = point;
                if (point.type == "left") return {
                    type, pos: [pos[0] + domRect.width * props.skew * 0.5, pos[1]]
                };
                if (point.type == "right") return {
                    type, pos: [pos[0] - domRect.width * props.skew * 0.5, pos[1]]
                };
                return point;
            });
        }
    };

    const ResizeCallback = () => {
        console.log("Encoder resize");
        domRect = (refSelf.value as HTMLDivElement).getBoundingClientRect();
        keypoints.length = 0;
        const raw_keypoints = BoundingClientRect2KeyPoints(domRect, []);
        console.log(raw_keypoints);

        keypoints.push(...KeyPoint2Rotate(raw_keypoints));
    };

    const resizeObserver = new ResizeObserver(ResizeCallback);

    resizeObserver.observe(refSelf.value as Element);

    ResizeCallback();

    onUnmounted(() => {
        resizeObserver.unobserve(refSelf.value as Element);
    });
});

defineExpose({
    keypoints
});
</script>

<style scoped>
.encoder-block {

    background-color: v-bind("props.color");

    margin: auto;

    width: max-content;
}

.encoder-block-rotate-0 {
    clip-path: polygon(0 v-bind("`${props.skew * 100}%`"),
        100% 0,
        100% 100%,
        0 v-bind("`${100 - props.skew * 100}%`"));
}

.encoder-block-rotate-1 {
    clip-path: polygon(v-bind("`${props.skew * 100}%`") 0,
        v-bind("`${100 - props.skew * 100}%`") 0,
        100% 100%,
        0 100%);
}

.encoder-block-rotate-2 {
    clip-path: polygon(0 0,
        100% v-bind("`${props.skew * 100}%`"),
        100% v-bind("`${100 - props.skew * 100}%`"),
        0 100%);
}

.encoder-block-rotate-3 {
    clip-path: polygon(0 0,
        100% 0,
        v-bind("`${100 - props.skew * 100}%`") 100%,
        v-bind("`${props.skew * 100}%`") 100%);
}
</style>

<style scoped>
.triangle {
    width: 0;
    height: 0;
    position: absolute;
}

.triangle1-rotate-0 {
    border-top: v-bind("`${contentHeight * props.skew}px`") solid black;
    border-right: v-bind("contentWidth + 'px'") solid transparent;

    transform: translateY(2px);
}

.triangle2-rotate-0 {
    border-bottom: v-bind("contentHeight * props.skew + 'px'") solid black;
    border-right: v-bind("contentWidth + 'px'") solid transparent;

    transform: translateY(v-bind("(-2 - contentHeight * props.skew) + 'px'"));
}

.triangle1-rotate-1 {
    border-top: v-bind("contentHeight + 'px'") solid black;
    border-right: v-bind("contentWidth * props.skew + 'px'") solid transparent;

    transform: translateX(2px);
}

.triangle2-rotate-1 {
    border-top: v-bind("contentHeight + 'px'") solid black;
    border-left: v-bind("contentWidth * props.skew + 'px'") solid transparent;

    transform: translate(calc(v-bind("`${contentWidth - 2 * (1 - props.skew)}px`") - 100%), -100%);
}

.triangle1-rotate-2 {
    border-top: v-bind("`${contentHeight * props.skew}px`") solid black;
    border-left: v-bind("contentWidth + 'px'") solid transparent;

    transform: translateY(2px);
}

.triangle2-rotate-2 {
    border-bottom: v-bind("contentHeight * props.skew + 'px'") solid black;
    border-left: v-bind("contentWidth + 'px'") solid transparent;

    transform: translateY(v-bind("(-2 - contentHeight * props.skew) + 'px'"));
}

.triangle1-rotate-3 {
    border-bottom: v-bind("contentHeight + 'px'") solid black;
    border-right: v-bind("contentWidth * props.skew + 'px'") solid transparent;

    transform: translateX(2px);
}

.triangle2-rotate-3 {
    border-bottom: v-bind("contentHeight + 'px'") solid black;
    border-left: v-bind("contentWidth * props.skew + 'px'") solid transparent;

    transform: translate(calc(v-bind("`${contentWidth - 2 * (1 - props.skew)}px`") - 100%), -100%);
}
</style>

<style scoped>
.content-rotate-0,
.content-rotate-2 {
    padding: 1rem;
    border: 2px solid black;
}

.content-rotate-1,
.content-rotate-3 {
    padding: .6rem 1.5rem;
    border: 2px solid black;
}
</style>
<template>
    <div>
        <div class="encoder-block" ref="refSelf" :class="[`encoder-block-rotate-${props.rotate}`]">
            <div class="triangle" :class="[`triangle1-rotate-${props.rotate}`]"></div>
            <div :class="[`content-rotate-${props.rotate}`]" ref="content">
                <MathDisplay :content="props.name" :math="props.math" />
            </div>
            <div class="triangle" :class="[`triangle2-rotate-${props.rotate}`]"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import MathDisplay from "../comp/MathDisplay.vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";
import noError from "@/utils/noError";
import log from "@/utils/log";
import { useColorStore } from "@/stores/color";
import resizeListener from "@/utils/resizeListener";

const props = withDefaults(defineProps<{
    /** Module name */
    name?: string,

    /** if math mode is enabled */
    math?: boolean,

    color?: string,

    skew?: number,

    rotate?: 0 | 1 | 2 | 3,
}>(), {
    name: "Encoder",
    math: false,
    color: "default",
    skew: 0.2,
    rotate: 0,
});

const colorStore = useColorStore();

const content = ref();

const contentWidth = ref(0);
const contentHeight = ref(0);


onMounted(() => {
    onUnmounted(
        resizeListener(content.value, () => {
            contentWidth.value = content.value.offsetWidth;
            contentHeight.value = content.value.offsetHeight;
        })
    );
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

    onUnmounted(
        resizeListener(refSelf.value, () => {
            log("Encoder resize");
            domRect = (refSelf.value as HTMLDivElement).getBoundingClientRect();
            keypoints.length = 0;
            const raw_keypoints = BoundingClientRect2KeyPoints(domRect, []);
            log(raw_keypoints);

            keypoints.push(...KeyPoint2Rotate(raw_keypoints));
        })
    );
});

defineExpose({
    keypoints
});
</script>

<style scoped>
.encoder-block {

    background-color: v-bind("props.color == 'default' ? colorStore.getColor(props.name) : props.color");

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
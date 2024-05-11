<template>
    <div>
        <div class="functional-module" ref="self">
            <MathDisplay :content="props.name" :math="props.math" ref="mathDisplay" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import MathDisplay from "../comp/MathDisplay.vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";
import noError from "@/utils/noError";
import log from "@/utils/log";
import resizeListener from "@/utils/resizeListener";

const props = withDefaults(defineProps<{
    /** Module name */
    name?: string,

    color?: string,

    math?: boolean,
}>(), {
    name: "\\mathcal{F}",
    color: "#fff",
    math: true,
});

const mathDisplay = ref();

const contentSize = ref(1000);

// Listen to the width and height of mathDisplay
onMounted(() => {

    const resize_callback = noError(() => {
        const el = mathDisplay.value.$el;
        contentSize.value = Math.max(
            el.offsetWidth as number ?? 0,
            el.offsetHeight as number ?? 0,
        ) ?? 0;
    });

    const resizeObserver = new ResizeObserver(resize_callback);

    window.addEventListener("resize", resize_callback);

    resize_callback();

    resizeObserver.observe(mathDisplay.value.$el);
});



const self = ref();

const keypoints = reactive<KeyPoints>([]);

onMounted(() => {
    onUnmounted(
        resizeListener(self.value, () => {
            const domRect = (self.value as HTMLDivElement).getBoundingClientRect();
            keypoints.length = 0;
            BoundingClientRect2KeyPoints(domRect, keypoints);
            log(domRect, keypoints);
        }) // damn, damn, damn. I put pair of bracket here and it cost me 2 hours to debug.
    );
});

defineExpose({
    keypoints,
    el: self
});
</script>

<style scoped>
.functional-module {
    background-color: v-bind("props.color");

    padding: .1rem;

    border-radius: 50%;
    border: 2px solid #333;

    width: v-bind("`${contentSize}px`");
    height: v-bind("`${contentSize}px`");

    min-width: max-content;

    font-size: 0.6rem;

    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;

    margin: auto;
}
</style>

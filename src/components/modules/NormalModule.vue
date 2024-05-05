<template>
    <div class="normal-module" ref="refSelf">
        <MathDisplay :content="props.name" :math="props.math" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import MathDisplay from "../comp/MathDisplay.vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";

const props = withDefaults(defineProps<{
    /** 模块名 */
    name?: string,

    color?: string,

    math?: boolean,
}>(), {
    name: "Liner",
    color: "#6decff",
    math: false,
});

const refSelf = ref();

const keypoints = reactive<KeyPoints>([]);

onMounted(() => {
    const ResizeCallback = () => {
        const domRect = (refSelf.value as HTMLDivElement).getBoundingClientRect();
        keypoints.length = 0;
        BoundingClientRect2KeyPoints(domRect, keypoints);
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
.normal-module {
    background-color: v-bind("props.color");

    padding: .2rem 1rem;
    /* margin: .5em; */

    border-radius: 0.5rem;
    border: 2px solid #333;

    width: auto;
}
</style>
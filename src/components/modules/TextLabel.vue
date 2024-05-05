<template>
    <div class="normal-module" ref="refSelf">
        <MathDisplay :content="props.name" :math="props.math" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import MathDisplay from "../comp/MathDisplay.vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";
import noError from "@/utils/noError";

const props = withDefaults(defineProps<{
    /** 模块名 */
    name?: string,

    math?: boolean,
}>(), {
    name: "Liner",
    math: false,
});

const refSelf = ref();

const keypoints = reactive<KeyPoints>([]);

onMounted(noError(() => {
    const ResizeCallback = noError(() => {
        const domRect = (refSelf.value as HTMLDivElement).getBoundingClientRect();
        keypoints.length = 0;
        BoundingClientRect2KeyPoints(domRect, keypoints);
    });

    const resizeObserver = new ResizeObserver(ResizeCallback);

    resizeObserver.observe(refSelf.value as Element);

    ResizeCallback();

    onUnmounted(noError(() => {
        resizeObserver.unobserve(refSelf.value as Element);
    }));
}));

defineExpose({
    keypoints
});
</script>

<style scoped>
.normal-module {

    padding: .2rem 1rem;
    /* margin: .5em; */

    border-radius: 0.5rem;

    width: auto;
}
</style>
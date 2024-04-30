<template>
    <div class="functional-module" ref="refSelf">
        <MathDisplay :content="props.name" :math="props.math" ref="mathDisplay" />
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
    name: "\\mathcal{F}",
    color: "#fff",
    math: true,
});

const mathDisplay = ref();

const contentSize = ref(1000);

// 监听mathDisplay长宽
onMounted(() => {
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { width, height } = entry.contentRect;
            contentSize.value = Math.max(width, height);
            console.log(contentSize.value);
        }
    });

    contentSize.value = Math.max(
        (mathDisplay.value?.dom as HTMLDivElement).offsetWidth as number ?? 0,
        (mathDisplay.value?.dom as HTMLDivElement).offsetHeight as number ?? 0,
    ) ?? 0;

    resizeObserver.observe(mathDisplay.value.$el);
});


const refSelf = ref();

const keypoints = reactive<KeyPoints>([]);

onMounted(() => {
    const ResizeCallback = () => {
        const domRect = (refSelf.value as HTMLDivElement).getBoundingClientRect();
        keypoints.length = 0;
        BoundingClientRect2KeyPoints(domRect, keypoints);
        console.log(keypoints);
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
.functional-module {
    background-color: v-bind("props.color");

    padding: .1rem;

    border-radius: 50%;
    border: 2px solid #333;

    width: v-bind("`${contentSize}px`");
    height: v-bind("`${contentSize}px`");

    min-width: max-content;

    /* padding: auto; */

    font-size: 0.7rem;

    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
}
</style>

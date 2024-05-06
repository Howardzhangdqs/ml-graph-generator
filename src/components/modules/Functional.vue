<template>
    <div>
        <div class="functional-module" ref="refSelf">
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
    const resizeObserver = new ResizeObserver(noError((entries) => {
        for (const entry of entries) {
            const { width, height } = entry.contentRect;
            contentSize.value = Math.max(width, height);
            log(contentSize.value);
        }
    }));

    contentSize.value = Math.max(
        (mathDisplay.value?.dom as HTMLDivElement).offsetWidth as number ?? 0,
        (mathDisplay.value?.dom as HTMLDivElement).offsetHeight as number ?? 0,
    ) ?? 0;

    resizeObserver.observe(mathDisplay.value.$el);
});


const refSelf = ref();

const keypoints = reactive<KeyPoints>([]);

onMounted(() => {
    const ResizeCallback = noError(() => {
        const domRect = (refSelf.value as HTMLDivElement).getBoundingClientRect();
        keypoints.length = 0;
        BoundingClientRect2KeyPoints(domRect, keypoints);
        log(keypoints);
    });

    const resizeObserver = new ResizeObserver(ResizeCallback);

    resizeObserver.observe(refSelf.value as Element);

    ResizeCallback();

    onUnmounted(noError(() => {
        resizeObserver.unobserve(refSelf.value as Element);
    }));
});

defineExpose({
    keypoints,
    el: refSelf
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

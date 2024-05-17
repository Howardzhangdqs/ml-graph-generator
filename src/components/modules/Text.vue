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
import resizeListener from "@/utils/resizeListener";

const props = withDefaults(defineProps<{
    /** Module name */
    name?: string,

    math?: boolean,
}>(), {
    name: "Liner",
    math: false,
});

const refSelf = ref();

const keypoints = reactive<KeyPoints>([]);

onMounted(() => {
    onUnmounted(
        resizeListener(refSelf.value, () => {
            const domRect = (refSelf.value as HTMLDivElement).getBoundingClientRect();
            keypoints.length = 0;
            BoundingClientRect2KeyPoints(domRect, keypoints);
        })
    );
});

defineExpose({
    keypoints
});
</script>

<style scoped>
.normal-module {

    padding: 0;
    margin: 0;

    width: auto;

    text-align: center;
}
</style>
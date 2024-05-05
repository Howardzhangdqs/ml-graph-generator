<template>
    <div class="normal-tensor" ref="refSelf" :style="{
        background: props.background,
    }">
        <table class="normal-tensor-block">
            <tr v-for="col in props.col" :key="col">
                <td v-for="row in props.row" :key="row">
                    <div :style="{
                        width: props.width,
                        height: props.height,
                        // transform : `rotate(${props.rotate * 90}deg)`,
                    }"></div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";
import noError from "@/utils/noError";

const props = withDefaults(defineProps<{
    color?: string,

    row?: number,
    col?: number,

    width?: string,
    height?: string,
    background?: string,
    rotate?: 0 | 1
}>(), {
    color: "#000",

    row: 4,
    col: 1,

    width: "18px",
    height: "20px",
    background: "linear-gradient(145deg, rgb(217 250 255), rgb(109, 236, 255))",
    rotate: 0,
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

    onUnmounted(() => {
        resizeObserver.unobserve(refSelf.value as Element);
    });
}));

defineExpose({
    keypoints
});
</script>

<style scoped>
.normal-tensor {
    display: flex;
}

table,
th,
td {
    border: 2px solid black;
    border-collapse: collapse;
    padding: 0;
}
</style>
<template>
    <div class="normal-tensor" ref="refSelf" :style="{
        background   : props.background,
        flexDirection: props.rotate === 0 ? 'row': 'column',
    }">
        <div class="normal-tensor-block" v-for="(item, key) in props.number" :key="key" :style="{
            borderLeft: (props.rotate === 1 || key === 0) ? '2px solid ' + props.color: 'none',
            borderTop : (props.rotate === 1 && key !== 0) ? 'none'                    : '2px solid ' + props.color,
            width     : props.width,
            height    : props.height,
        }"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";

const props = withDefaults(defineProps<{
    color     ?: string,
    number    ?: number,
    width     ?: string,
    height    ?: string,
    background?: string,
    rotate    ?: 0 | 1
}>(), {
    color     : "#000",
    number    : 4,
    width     : "18px",
    height    : "20px",
    background: "linear-gradient(145deg, rgb(217 250 255), rgb(109, 236, 255))",
    rotate    : 0,
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

.normal-tensor {
    display: flex;
}

.normal-tensor-block {
    border-left: 2px solid v-bind("props.color");
    border-top: 2px solid v-bind("props.color");
    border-bottom: 2px solid v-bind("props.color");
    border-right: 2px solid v-bind("props.color");
}
</style>
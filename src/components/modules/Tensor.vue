<template>
    <div class="normal-tensor" ref="refSelf" :style="{
        background: props.background === 'default' ? colorStore.getColor('Tensor1') : props.background,
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
import { useColorStore } from "@/stores/color";
import resizeListener from "@/utils/resizeListener";

const colorStore = useColorStore();

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
    background: "default",
    rotate: 0,
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
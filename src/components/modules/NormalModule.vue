<template>
    <div>
        <div class="normal-module" ref="refSelf" :style="styles">
            <MathDisplay :content="props.name" :math="props.math" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import MathDisplay from "../comp/MathDisplay.vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";
import { useColorStore } from "@/stores/color";
import resizeListener from "@/utils/resizeListener";

const props = withDefaults(defineProps<{
    /** Module name */
    name?: string,

    color?: string,

    math?: boolean,

    styles?: any,
}>(), {
    name: "Liner",
    color: "default",
    math: false,
    styles: {}
});

const colorStore = useColorStore();

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
    background-color: v-bind("props.color == 'default' ? colorStore.getColor(props.name) : props.color");

    padding: .2rem 1rem;
    /* margin: .5em; */

    border-radius: 0.5rem;
    border: 2px solid #333;

    width: auto;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
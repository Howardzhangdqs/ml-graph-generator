<template>
    <img class="image-module" :src="props.src" alt="Image" ref="refSelf" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";
import resizeListener from "@/utils/resizeListener";

const props = withDefaults(defineProps<{
    /** Module name */
    name?: string,
    src?: string,
    width?: string,
    height?: string,
}>(), {
    name: "Image",
    src: "/vit/example.jpg",
    width: "50px",
    height: "50px",
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
.image-module {
    width: v-bind("props.width");
    height: v-bind("props.height");
    vertical-align: middle;
}
</style>
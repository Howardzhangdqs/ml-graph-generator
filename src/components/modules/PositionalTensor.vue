<template>
    <div class="positional-encoding-module" ref="refSelf">
        <div class="yin-yang">
            <div class="yin-yang-left"></div>
            <div class="yin-yang-right"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { BoundingClientRect2KeyPoints, type KeyPoints } from "./getModulePosition";
import noError from "@/utils/noError";
import log from "@/utils/log";
import resizeListener from "@/utils/resizeListener";

const refSelf = ref();

const keypoints = reactive<KeyPoints>([]);

onMounted(() => {
    onUnmounted(
        resizeListener(refSelf.value, () => {
            const domRect = (refSelf.value as HTMLDivElement).getBoundingClientRect();
            keypoints.length = 0;
            BoundingClientRect2KeyPoints(domRect, keypoints);
            log(keypoints);
        })
    );
});

defineExpose({
    keypoints
});
</script>

<style scoped>
.yin-yang {
    width: 2.5em;
    height: 2.5em;
    margin: auto;
    border: 2px solid black;
    border-radius: 50%;
    /* background: linear-gradient(90deg, white 50%, black 50%); */
    position: relative;
}

/* Draw upper semicircle on the left */
.yin-yang-left::before {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    border-radius: 50%;
    background: black;
    left: 0;
    top: 0;
}

/* Draw lower semicircle on the right */
.yin-yang-right::before {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    border-radius: 50%;
    background: white;
    right: 0;
    top: 0;
}
.yin-yang-left {
    width: calc(50% - 1px);
    height: calc(50% - 1px);
    transform: rotate(180deg);

    border-radius: 50%;
    left: -2px;
    top: 9px;
    border: 2px solid #000;
    position: relative;

    mask: linear-gradient(transparent 50%, black 50%);
}

.yin-yang-right {
    width: calc(50% - 1px);
    height: calc(50% - 1px);

    right: -19px;
    left: auto;
    top: -15px;

    border-radius: 50%;

    border: 2px solid #000;
    position: relative;

    mask: linear-gradient(transparent 50%, black 50%);
}
</style>
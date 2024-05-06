<template>
    <div class="positional-encoding">
        <PositionalTensor />
        <div class="bar"></div>
        <FunctionalModule name="\boldsymbol{+}" ref="refFunctionalModule" />
        <div class="bar none"></div>
        <PositionalTensor class="none" />
    </div>
</template>

<script setup lang="ts">
import PositionalTensor from "./PositionalTensor.vue";
import FunctionalModule from "./Functional.vue";

import { onMounted, reactive, ref, watchEffect } from "vue";
import { type KeyPoints } from "./getModulePosition";

const refFunctionalModule = ref();

let keypoints = reactive<KeyPoints>([]);

onMounted(() => {
    keypoints.length = 0;
    keypoints.push(...refFunctionalModule.value.keypoints);

    watchEffect(() => {
        keypoints.length = 0;
        keypoints.push(...refFunctionalModule.value.keypoints);
    });
});

defineExpose({
    keypoints
});
</script>

<style scoped>
.positional-encoding {
    display: flex;
    align-items: center;
}

.bar {
    height: 2px;
    width: 1.5rem;
    background-color: #333;
    margin: 0 -1px;
}

.none {
    opacity: 0;
}
</style>
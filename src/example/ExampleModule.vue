<template>
    <div class="container">
        {{ $t("messages.info") }}
    </div>
    <div class="container">
        <ModuleDisplay name="NormalModule">
            <NormalModule ref="refNormalModule" />
        </ModuleDisplay>

        <ModuleDisplay name="EncoderModule">
            <EncoderModule ref="refEncoderModule0" />
        </ModuleDisplay>
        <ModuleDisplay name="EncoderModule">
            <EncoderModule :rotate="1" ref="refEncoderModule1" />
        </ModuleDisplay>
        <ModuleDisplay name="EncoderModule">
            <EncoderModule :rotate="2" ref="refEncoderModule2" />
        </ModuleDisplay>
        <ModuleDisplay name="EncoderModule">
            <EncoderModule :rotate="3" ref="refEncoderModule3" />
        </ModuleDisplay>

        <ModuleDisplay name="FunctionalModule">
            <Functional ref="refFunctionalModule" />
        </ModuleDisplay>

        <ModuleDisplay name="LayerBlock">
            <LayerBlock ref="refLayerBlock" />
        </ModuleDisplay>

        <ModuleDisplay name="PositionalEncoding">
            <PositionalEncoding ref="refPositionalEncoding" />
        </ModuleDisplay>

        <ModuleDisplay name="PositionalTensor">
            <PositionalTensor ref="refPositionalTensor" />
        </ModuleDisplay>

        <ModuleDisplay name="NormalTensor">
            <NormalTensor ref="refNormalTensor" />
        </ModuleDisplay>
    </div>
    <div class="keypoints">
        <div class="keypoints-point" v-for="(point, key) in keypoints" :key="key" :style="{
            left: point.pos[0] + 'px',
            top: point.pos[1] + 'px',
        }"></div>
    </div>
    <svg class="mask" ref="canvas"></svg>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";

import ModuleDisplay from "./ModuleDisplay.vue";

import NormalModule from "@/components/modules/NormalModule.vue";
import EncoderModule from "@/components/modules/Encoder.vue";
import Functional from "@/components/modules/Functional.vue";
import LayerBlock from "@/components/modules/Block.vue";
import PositionalEncoding from "@/components/modules/PositionalEncoding.vue";
import PositionalTensor from "@/components/modules/PositionalTensor.vue";
import NormalTensor from "@/components/modules/Tensor.vue";

import type { KeyPoints } from "@/components/modules/getModulePosition";

import execImmediately from "@/utils/execImmediately";
import log from "@/utils/log";
import noError from "@/utils/noError";


const refNormalModule = ref<any>();
const refEncoderModule0 = ref<any>();
const refEncoderModule1 = ref<any>();
const refEncoderModule2 = ref<any>();
const refEncoderModule3 = ref<any>();
const refFunctionalModule = ref<any>();
const refLayerBlock = ref<any>();
const refPositionalEncoding = ref<any>();
const refPositionalTensor = ref<any>();
const refNormalTensor = ref<any>();

const keypoints = reactive<KeyPoints>([]);

const AddKeyPoints = (_keypoints: KeyPoints | undefined) => {
    if (_keypoints) keypoints.push(..._keypoints);
};

const canvas = ref<HTMLCanvasElement>();

watchEffect(noError(() => {
    keypoints.length = 0;

    AddKeyPoints(refNormalModule.value?.keypoints);
    AddKeyPoints(refFunctionalModule.value?.keypoints);
    AddKeyPoints(refPositionalEncoding.value?.keypoints);
    AddKeyPoints(refPositionalTensor.value?.keypoints);

    AddKeyPoints(refEncoderModule0.value?.keypoints);
    AddKeyPoints(refEncoderModule1.value?.keypoints);
    AddKeyPoints(refEncoderModule2.value?.keypoints);
    AddKeyPoints(refEncoderModule3.value?.keypoints);

    AddKeyPoints(refNormalTensor.value?.keypoints);

    log(canvas.value);
}));


const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

window.addEventListener("resize", execImmediately(() => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
    log(windowWidth.value, windowHeight.value);
}));

</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin: 1rem;
}

.keypoints {
    position: absolute;
    top: 0;
    left: 0;
}

.keypoints-point {
    --keypoint-size: 3px;

    position: absolute;
    width: var(--keypoint-size);
    height: var(--keypoint-size);
    border-radius: 50%;
    background-color: #f00;
    transform: translate(-50%, -50%);
}
</style>

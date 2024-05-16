<template>
    <FlexRow :style="{
        AlignItems: 'flex-end'
    }" ref="self">
        <ExampleTransformerEncoder ref="TransformerEncoder" />
        <ExampleTransformerDecoder ref="TransformerDncoder" />
    </FlexRow>
    <svg ref="svg" class="mask"></svg>
</template>

<script setup lang="ts">
import ExampleTransformerEncoder from "./ExampleTransformerEncoder.vue";
import ExampleTransformerDecoder from "./ExampleTransformerDecoder.vue";
import FlexRow from "@/components/comp/FlexRow.vue";
import { ref, watchEffect } from "vue";
import noError from "@/utils/noError";
import DrawArrow from "@/components/comp/DrawArrow";
import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";
import listAdd from "@/utils/listAdd";
import log from "@/utils/log";

const svg = ref<any>();
const self = ref<any>();

const TransformerEncoder = ref<any>();
const TransformerDncoder = ref<any>();

watchEffect(noError(() => {
    svg.value.innerHTML = "";
    svg.value.style.height = `${(self.value.el as HTMLElement).parentElement?.clientHeight}px`;

    log("AddAndNorm2", TransformerEncoder.value?.FeedForward.keypoints);

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(TransformerEncoder.value?.FeedForward.keypoints).top,
        KeyPoints2Dictionary(TransformerDncoder.value?.MultiHeadAttention.keypoints).bottom,
        [[0, -63], [99, 0], [0, 93]]
    );

    DrawArrow(
        svg.value,
        listAdd(KeyPoints2Dictionary(TransformerEncoder.value?.FeedForward.keypoints).top, [120, 93 - 63]),
        listAdd(KeyPoints2Dictionary(TransformerDncoder.value?.MultiHeadAttention.keypoints).bottom, [-40, 0]),
        [],
        undefined, undefined, false
    );
}));
</script>

<style scoped></style>
<template>
    <FlexColumn gap="0">
        <GapSpace height="2em" />

        <TextLabel :style="{
            position: 'relative',
            transform: 'translate(-120px, 150px)'
        }" name="N\times" math />
        <LayerBlock>
            <FlexRow>
                <GapSpace width="1.3em" />
                <FlexColumn gap=".5rem">
                    <NormalModule ref="AddAndNorm2" name="Add & Norm" />
                    <NormalModule ref="FeedForward" name="Feed Forward" />
                    <GapSpace />
                    <NormalModule ref="AddAndNorm1" name="Add & Norm" />
                    <NormalModule ref="MultiHeadAttention" name="Multi-Head<br>Attention" />
                    <GapSpace height="2em" />
                </FlexColumn>
            </FlexRow>
        </LayerBlock>
        <BlockContainer>
            <FlexRow>
                <GapSpace width="1.3em" />
                <FlexColumn gap=".5rem">
                    <TextLabel :style="{
                        position: 'fixed',
                        transform: 'translate(-124px, -4px)'
                    }" name="Positional<br>Encoding" />
                    <PositionalEncoding ref="PositionalEncode" style="margin: auto; width: auto" />
                    <NormalModule ref="InputEmbedding" name="Input Embedding" />
                    <GapSpace />
                    <FlexColumn>
                        <TextLabel ref="InputText" name="Inputs" />
                        <GapSpace height="calc(1rem + 5px)" />
                    </FlexColumn>
                </FlexColumn>
            </FlexRow>
        </BlockContainer>
    </FlexColumn>
    <svg ref="svg" class="mask"></svg>
</template>

<script setup lang="ts">
import NormalModule from "@/components/modules/NormalModule.vue";
import PositionalEncoding from "@/components/modules/PositionalEncoding.vue";
import LayerBlock from "@/components/modules/LayerBlock.vue";
import GapSpace from "@/components/comp/GapSpace.vue";
import FlexColumn from "@/components/comp/FlexColumn.vue";
import FlexRow from "@/components/comp/FlexRow.vue";
import BlockContainer from "@/components/comp/BlockContainer.vue";

import DrawArrow from "@/components/comp/DrawArrow";
import { Transition, ref, watchEffect } from "vue";
import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";
import noError from "@/utils/noError";
import TextLabel from "@/components/modules/TextLabel.vue";
import type { transform } from "lodash";
import KeyPoints from "@/utils/KeyPoints";

const FeedForward = ref<any>();
const MultiHeadAttention = ref<any>();
const PositionalEncode = ref<any>();
const InputEmbedding = ref<any>();
const AddAndNorm1 = ref<any>();
const AddAndNorm2 = ref<any>();
const InputText = ref<any>();

const svg = ref<any>();

watchEffect(noError(() => {
    svg.value.innerHTML = "";

    DrawArrow(
        svg.value,
        KeyPoints(InputText).top, KeyPoints(InputEmbedding).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(InputEmbedding.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(PositionalEncode.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(PositionalEncode.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(MultiHeadAttention.value?.keypoints ?? []).bottom,
        "direct"
    );

    const MHAKeyPoints = KeyPoints2Dictionary(MultiHeadAttention.value?.keypoints ?? []);

    DrawArrow(
        svg.value,
        [MHAKeyPoints.bottom[0], MHAKeyPoints.bottom[1] + 20],
        [MHAKeyPoints.bottom[0] + 40, MHAKeyPoints.bottom[1]],
        [], undefined, undefined, false
    );

    DrawArrow(
        svg.value,
        [MHAKeyPoints.bottom[0], MHAKeyPoints.bottom[1] + 20],
        [MHAKeyPoints.bottom[0] - 40, MHAKeyPoints.bottom[1]],
        [], undefined, undefined, false
    );

    DrawArrow(
        svg.value,
        [MHAKeyPoints.bottom[0], MHAKeyPoints.bottom[1] + 35],
        KeyPoints2Dictionary(AddAndNorm1.value?.keypoints ?? []).left,
        [[-90, 0]], undefined, undefined, true
    );

    DrawArrow(
        svg.value,
        MHAKeyPoints.top,
        KeyPoints2Dictionary(FeedForward.value?.keypoints ?? []).bottom,
        "direct", undefined, undefined, true
    );

    const FeedForwardBottom = KeyPoints2Dictionary(FeedForward.value?.keypoints ?? []).bottom;
    const FeedForwardTop = KeyPoints2Dictionary(FeedForward.value?.keypoints ?? []).top;

    DrawArrow(
        svg.value,
        [FeedForwardBottom[0], FeedForwardBottom[1] + 18],
        KeyPoints2Dictionary(AddAndNorm2.value?.keypoints ?? []).left,
        [[-90, 0]], undefined, undefined, true
    );
}));

defineExpose({
    AddAndNorm2
});
</script>

<style scoped></style>
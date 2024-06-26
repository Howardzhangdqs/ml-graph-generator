<template>
    <FlexColumn ref="self" gap="0">
        <GapSpace height="2em" />

        <TextLabel :style="{
            position: 'relative',
            transform: 'translate(-116px, 187px)'
        }" name="N\times" math />
        <TextLabel :style="{
            position: 'relative',
            transform: 'translate(-114px, 303px)'
        }" name="Positional<br>Encoding" />

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
import LayerBlock from "@/components/modules/Block.vue";
import GapSpace from "@/components/comp/GapSpace.vue";
import FlexColumn from "@/components/comp/FlexColumn.vue";
import FlexRow from "@/components/comp/FlexRow.vue";
import BlockContainer from "@/components/comp/BlockContainer.vue";

import DrawArrow from "@/components/comp/DrawArrow";
import { ref, watchEffect } from "vue";
import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";
import noError from "@/utils/noError";
import TextLabel from "@/components/modules/Text.vue";
import svgResize from "@/utils/resizeSvg";

const self = ref<any>();

const FeedForward = ref<any>();
const MultiHeadAttention = ref<any>();
const PositionalEncode = ref<any>();
const InputEmbedding = ref<any>();
const AddAndNorm1 = ref<any>();
const AddAndNorm2 = ref<any>();
const InputText = ref<any>();

const svg = ref<any>();

watchEffect(noError(() => {
    svgResize(svg, self);

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(InputText.value?.keypoints).top,
        KeyPoints2Dictionary(InputEmbedding.value?.keypoints).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(InputEmbedding.value?.keypoints).top,
        KeyPoints2Dictionary(PositionalEncode.value?.keypoints).bottom,
        "direct"
    );

    const MHAKeyPoints = KeyPoints2Dictionary(MultiHeadAttention.value?.keypoints ?? []);

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(PositionalEncode.value?.keypoints).top,
        MHAKeyPoints.bottom,
        "direct"
    );

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
        KeyPoints2Dictionary(AddAndNorm1.value?.keypoints).left,
        [[-90, 0]], undefined, undefined, true
    );

    DrawArrow(
        svg.value,
        MHAKeyPoints.top,
        KeyPoints2Dictionary(FeedForward.value?.keypoints).bottom,
        "direct", undefined, undefined, true
    );

    const FeedForwardBottom = KeyPoints2Dictionary(FeedForward.value?.keypoints).bottom;

    DrawArrow(
        svg.value,
        [FeedForwardBottom[0], FeedForwardBottom[1] + 18],
        KeyPoints2Dictionary(AddAndNorm2.value?.keypoints).left,
        [[-90, 0]], undefined, undefined, true
    );
}));

defineExpose({
    FeedForward
});
</script>

<style scoped></style>
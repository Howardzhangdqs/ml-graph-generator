<template>
    <FlexColumn gap="0">
        <GapSpace height="2em" />
        <LayerBlock>
            <FlexRow>
                <GapSpace width="1.5em" />
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
                <GapSpace width="1.5em" />
                <FlexColumn gap=".5rem">
                    <PositionalEncoding ref="PositionalEncode" style="margin: auto; width: auto" />
                    <NormalModule ref="InputEmbedding" name="Input Embedding" />
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
import { ref, watchEffect } from "vue";
import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";

const FeedForward = ref<any>();
const MultiHeadAttention = ref<any>();
const PositionalEncode = ref<any>();
const InputEmbedding = ref<any>();
const AddAndNorm1 = ref<any>();
const AddAndNorm2 = ref<any>();

const svg = ref<any>();

watchEffect(() => {
    try {

        while (svg.value?.firstChild) {
            svg.value.removeChild(svg.value.firstChild);
        }

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
        
        DrawArrow(
            svg.value,
            [FeedForwardBottom[0], FeedForwardBottom[1] + 18],
            KeyPoints2Dictionary(AddAndNorm2.value?.keypoints ?? []).left,
            [[-90, 0]], undefined, undefined, true
        );
        
        DrawArrow(
            svg.value,
            FeedForwardTop,
            [FeedForwardTop[0] + 100, FeedForwardTop[1]],
            [[0, -65], [100, 0]], undefined, undefined, true
        );
    } catch (e) {
        console.log(e);
    }
});
</script>

<style scoped></style>
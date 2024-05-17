<template>
    <FlexColumn ref="container" :class="$style.container">
        <FlexRow>
            <Text name="<b>Vision Transformer (ViT)</b>" style="font-size: 1.3rem;"></Text>
        </FlexRow>
        <FlexRow>


            <Text :style="{
                position: 'absolute',
                transform: 'translate(-265px, 189px)',
                fontSize: '.8rem',
                textAlign: 'left'
            }" name="* Extra learnable<br><code>[class]</code> Embedding" :math="false" />

            <Text :style="{
                position: 'absolute',
                transform: 'translate(-265px, 157px)',
                fontSize: '.8rem',
                textAlign: 'left'
            }" name="<b>Patch + Position<br>Embedding</b>" :math="false" />

            <NormalModule name="<b>Class</b><br>Bird<br>Ball<br>Car<br>..." :styles="{
                width: 'min-content',
                borderRadius: '1.9rem',
                padding: '0.7rem .7rem 0.3rem .7rem',
                backgroundColor: '#ffd2a4',
            }" ref="refClass" />

            <GapSpace width="2rem" />

            <FlexColumn gap="1rem">
                <GapSpace />
                <NormalModule name="MLP<br>Head" :styles="{
                    width: 'min-content',
                    backgroundColor: '#ffd2a4',
                }" ref="refMLPHead" />
                <NormalModule ref="refEncoder" name="Transformer Encoder" :styles="{
                    height: '3rem',
                    backgroundColor: '#e5e5e5',
                }" />
                <Input />
            </FlexColumn>
        </FlexRow>
        <FlexRow>
            <div style="transform: translate(-265px, -80px);">
                <RawImage ref="rawimg" />
            </div>
        </FlexRow>
    </FlexColumn>

    <svg class="mask" ref="svg"></svg>
</template>

<script setup lang="ts">
import FlexColumn from "@/components/comp/FlexColumn.vue";
import FlexRow from "@/components/comp/FlexRow.vue";
import NormalModule from "@/components/modules/NormalModule.vue";
import Text from "@/components/modules/Text.vue";
import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";
import noError from "@/utils/noError";
import resizeSvg from "@/utils/resizeSvg";
import useDrawArrow from "@/utils/useDrawArrow";
import { ref, watchEffect } from "vue";
import RawImage from "./RawImage.vue";
import Input from "./Input.vue";
import GapSpace from "@/components/comp/GapSpace.vue";
import listAdd from "@/utils/listAdd";

const container = ref<any>();
const svg = ref<any>();

const rawimg = ref<any>();

const refClass = ref<any>();
const refMLPHead = ref<any>();
const refEncoder = ref<any>();

watchEffect(noError(() => {
    resizeSvg(svg, container);

    const { draw, clean } = useDrawArrow(svg.value);

    clean();

    draw(
        listAdd(KeyPoints2Dictionary(rawimg.value.el[5].keypoints).right, [0, 0]),
        listAdd(KeyPoints2Dictionary(rawimg.value.el[5].keypoints).right, [74, 0]),
    );

    draw(
        [
            KeyPoints2Dictionary(refMLPHead.value.keypoints).top[0],
            KeyPoints2Dictionary(refEncoder.value.keypoints).top[1]
        ],
        KeyPoints2Dictionary(refMLPHead.value.keypoints).bottom
    );

    draw(
        KeyPoints2Dictionary(refMLPHead.value.keypoints).left,
        [
            KeyPoints2Dictionary(refClass.value.keypoints).right[0],
            KeyPoints2Dictionary(refMLPHead.value.keypoints).left[1]
        ],
    );


}, undefined, true));
</script>

<style module>
.container {
    font-family: 'Times New Roman', Times, serif;
}
</style>
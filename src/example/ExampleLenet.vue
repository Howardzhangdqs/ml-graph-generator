<template>
    <FlexColumn ref="container" :class="$style.container">

        <template v-for="key in 6" :key>
            <Text :style="{
                position: 'absolute',
                fontSize: '.8rem',
                transform: `translate(-150px, calc(48px + ${key - 1} * 41.5px)) rotate(180deg)`,
            }" :name="`Layer #${key}`" />
        </template>

        <FlexRow>
            <FlexColumn gap=".8rem">
                <NormalModule ref="module1" name="Input: 32×32" />
                <NormalModule ref="module2" name="Convolution (6@28×28)" :color="colorStore.getColor('Convolution')" />
                <NormalModule ref="module3" name="Subsampling (6@14×14)" :color="colorStore.getColor('Subsampling')" />
                <NormalModule ref="module4" name="Convolution (16@10×10)" :color="colorStore.getColor('Convolution')" />
                <NormalModule ref="module5" name="Subsampling (16@5×5)" :color="colorStore.getColor('Subsampling')" />
                <NormalModule ref="module6" name="FC (120)" :color="colorStore.getColor('FC')" />
                <NormalModule ref="module7" name="FC (84)" :color="colorStore.getColor('FC')" />
                <NormalModule ref="module8" name="Output (10)" />
            </FlexColumn>
        </FlexRow>
    </FlexColumn>

    <svg class="mask" ref="svg"></svg>
</template>

<script setup lang="ts">
import DrawArrow from "@/components/comp/DrawArrow";
import FlexColumn from "@/components/comp/FlexColumn.vue";
import FlexRow from "@/components/comp/FlexRow.vue";
import NormalModule from "@/components/modules/NormalModule.vue";
import Text from "@/components/modules/Text.vue";
import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";
import { useColorStore } from "@/stores/color";
import noError from "@/utils/noError";
import resizeSvg from "@/utils/resizeSvg";
import { ref, watchEffect } from "vue";

const colorStore = useColorStore();

const container = ref<any>();
const svg = ref<any>();

const module1 = ref<any>();
const module2 = ref<any>();
const module3 = ref<any>();
const module4 = ref<any>();
const module5 = ref<any>();
const module6 = ref<any>();
const module7 = ref<any>();
const module8 = ref<any>();

watchEffect(noError(() => {
    resizeSvg(svg, container);

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(module1.value?.keypoints ?? []).right,
        KeyPoints2Dictionary(module2.value?.keypoints ?? []).left,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(module2.value?.keypoints ?? []).right,
        KeyPoints2Dictionary(module3.value?.keypoints ?? []).left,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(module3.value?.keypoints ?? []).right,
        KeyPoints2Dictionary(module4.value?.keypoints ?? []).left,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(module4.value?.keypoints ?? []).right,
        KeyPoints2Dictionary(module5.value?.keypoints ?? []).left,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(module5.value?.keypoints ?? []).right,
        KeyPoints2Dictionary(module6.value?.keypoints ?? []).left,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(module6.value?.keypoints ?? []).right,
        KeyPoints2Dictionary(module7.value?.keypoints ?? []).left,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(module7.value?.keypoints ?? []).right,
        KeyPoints2Dictionary(module8.value?.keypoints ?? []).left,
        "direct"
    );
}));
</script>

<style module>
.container {
    font-family: Consolas;
    transform: rotate(270deg);
}
</style>
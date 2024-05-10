<template>
    <FlexRow gap="2rem">
        <FlexColumn gap="2rem">
            <Text ref="res11" name="" />
            <NormalModule ref="res12" v-same-width="'1'" name="Activation function" />
            <GapSpace :height="`${FunctionalHeight}px`" />
            <Text :style="{
                position: 'fixed',
                transform: 'translate(-50px, 120px)',
                fontSize: '.8rem',
            }" name="f(\mathbf{x})" math />
            <Block color="#0000"
                style="background-color: #0000; border-style: dashed; border-radius: 0; padding: .5rem;">
                <FlexColumn gap="1rem">
                    <NormalModule ref="res13" v-same-width="'1'" name="Weight layer" />
                    <NormalModule ref="res14" v-same-width="'1'" name="Activation function" />
                    <NormalModule ref="res15" v-same-width="'1'" name="Weight layer" />
                </FlexColumn>
            </Block>
            <Text ref="res16" />
        </FlexColumn>
        <FlexColumn gap="2rem">
            <Text ref="res21" name="" />
            <NormalModule ref="res22" v-same-width="'1'" name="Activation function" />
            <Text :style="{
                position: 'fixed',
                transform: 'translate(-65px, 70px)',
                fontSize: '.8rem',
            }" name="f(\mathbf{x}) = g(\mathbf{x}) + \mathbf{x}" math />
            <Functional ref="res27" name="\boldsymbol{+}" />
            <Text :style="{
                position: 'fixed',
                transform: 'translate(-50px, 120px)',
                fontSize: '.8rem',
            }" name="f(\mathbf{x})" math />
            <Block color="#0000"
                style="background-color: #0000; border-style: dashed; border-radius: 0; padding: .5rem;">
                <FlexColumn gap="1rem">
                    <NormalModule ref="res23" v-same-width="'1'" name="Weight layer" />
                    <NormalModule ref="res24" v-same-width="'1'" name="Activation function" />
                    <NormalModule ref="res25" v-same-width="'1'" name="Weight layer" />
                </FlexColumn>
            </Block>
            <Text ref="res26" />
        </FlexColumn>
    </FlexRow>
    <svg class="mask" ref="svg"></svg>
</template>

<script setup lang="ts">
import Text from "@/components/modules/Text.vue";
import NormalModule from "@/components/modules/NormalModule.vue";
import Block from "@/components/modules/Block.vue";
import FlexRow from "@/components/comp/FlexRow.vue";
import FlexColumn from "@/components/comp/FlexColumn.vue";

import vSameWidth from "@/components/directives/vSameWidth";
import { ref, watchEffect } from "vue";
import noError from "@/utils/noError";
import DrawArrow from "@/components/comp/DrawArrow";
import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";
import GapSpace from "@/components/comp/GapSpace.vue";
import Functional from "@/components/modules/Functional.vue";
import listAdd from "@/utils/listAdd";

const res11 = ref<any>();
const res12 = ref<any>();
const res13 = ref<any>();
const res14 = ref<any>();
const res15 = ref<any>();
const res16 = ref<any>();

const res21 = ref<any>();
const res22 = ref<any>();
const res23 = ref<any>();
const res24 = ref<any>();
const res25 = ref<any>();
const res26 = ref<any>();
const res27 = ref<any>();

const svg = ref<any>();

const FunctionalHeight = ref(0);

watchEffect(noError(() => {
    svg.value.innerHTML = "";

    FunctionalHeight.value = res27.value?.el.offsetHeight ?? 0;

    // Normal block

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res16.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res15.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res15.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res14.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res14.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res13.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res13.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res12.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res12.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res11.value?.keypoints ?? []).bottom,
        "direct"
    );

    // Residuals block

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res26.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res25.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res25.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res24.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res24.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res23.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res23.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res22.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        KeyPoints2Dictionary(res22.value?.keypoints ?? []).top,
        KeyPoints2Dictionary(res21.value?.keypoints ?? []).bottom,
        "direct"
    );

    DrawArrow(
        svg.value,
        listAdd(KeyPoints2Dictionary(res26.value?.keypoints ?? []).top, [0, -15]),
        KeyPoints2Dictionary(res27.value?.keypoints ?? []).right,
        [[125, 0]], undefined, undefined, true
    );

}));
</script>

<style scoped></style>
<template>
    <FlexRow ref="container">
        <!-- Input -->
        <FlexColumn>
            <GapSpace height="2rem" />
            <GapSpace height="23px" />
            <Text name="C_{t-1}" math ref="ModuleCt1" style="padding: 0 .3rem;" />
            <GapSpace height="117px" />
            <Text name="h_{t-1}" math ref="ModuleHt1" style="padding: 0 .3rem;" />
        </FlexColumn>

        <GapSpace />

        <FlexColumn>
            <GapSpace height="2rem" />
            <GapSpace height="210px" />
            <Text name="x_t" math ref="ModuleXt" />
        </FlexColumn>

        <GapSpace />

        <!-- Model -->
        <FlexColumn>
            <GapSpace height="2rem" />
            <Block style="border-radius: 1.5rem; padding: .7rem;" color="#0f01">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Functional ref="Fun11" :color="getColor('1')" :class="$style.function"
                                    name="\boldsymbol{\times}" />
                            </td>
                            <td></td>
                            <td>
                                <Functional ref="Fun12" :color="getColor('1')" :class="$style.function"
                                    name="\boldsymbol{+}" />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <Functional ref="Fun21" :color="getColor('1')" :class="$style.function"
                                    name="\boldsymbol{\times}" />
                            </td>
                            <td></td>
                            <td>
                                <Functional ref="Fun22" :color="getColor('1')" name="\tanh" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Functional ref="Fun31" :color="getColor('2')" :class="$style.function" name="\sigma" />
                            </td>
                            <td>
                                <Functional ref="Fun32" :color="getColor('2')" :class="$style.function" name="\sigma" />
                            </td>
                            <td>
                                <Functional ref="Fun33" :color="getColor('2')" name="\tanh" />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Functional ref="Fun41" :color="getColor('2')" :class="$style.function" name="\sigma" />
                            </td>
                            <td>
                                <Functional ref="Fun42" :color="getColor('1')" :class="$style.function"
                                    name="\boldsymbol{\times}" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Block>
        </FlexColumn>

        <GapSpace />

        <!-- Output -->
        <FlexColumn>
            <Text name="h_t" math ref="ModuleHt" />
        </FlexColumn>

        <GapSpace />
        <FlexColumn>
            <GapSpace height="2rem" />
            <GapSpace height="23px" />
            <Text name="C_t" math ref="ModuleCt2" style="padding: 0 .5rem;" />
            <GapSpace height="117px" />
            <Text name="h_t" math ref="ModuleHt2" style="padding: 0 .5rem;" />
        </FlexColumn>
    </FlexRow>

    <svg ref="svg" class="mask"></svg>
</template>

<script setup lang="ts">
import FlexColumn from "@/components/comp/FlexColumn.vue";
import FlexRow from "@/components/comp/FlexRow.vue";
import GapSpace from "@/components/comp/GapSpace.vue";
import Block from "@/components/modules/Block.vue";
import Functional from "@/components/modules/Functional.vue";

import Text from "@/components/modules/Text.vue";
import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";
import { useColorStore } from "@/stores/color";
import noError from "@/utils/noError";
import resizeListener from "@/utils/resizeListener";
import resizeSvg from "@/utils/resizeSvg";
import useDrawArrow from "@/utils/useDrawArrow";
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";

const colorStore = useColorStore();
const getColor = colorStore.getColor;

const svg = ref<any>();
const container = ref<any>();

const ModuleCt1 = ref<any>();
const ModuleHt1 = ref<any>();
const ModuleXt = ref<any>();
const ModuleCt2 = ref<any>();
const ModuleHt2 = ref<any>();
const ModuleHt = ref<any>();
const Fun11 = ref<any>();
const Fun12 = ref<any>();
const Fun21 = ref<any>();
const Fun22 = ref<any>();
const Fun31 = ref<any>();
const Fun32 = ref<any>();
const Fun33 = ref<any>();
const Fun41 = ref<any>();
const Fun42 = ref<any>();

const DrawArrow = noError(() => {
    resizeSvg(svg, container);

    const { draw } = useDrawArrow(svg.value);

    const ModuleCt1Right = KeyPoints2Dictionary(ModuleCt1.value?.keypoints).right;
    const Fun11Left = KeyPoints2Dictionary(Fun11.value?.keypoints).left;

    draw(
        [ModuleCt1Right[0], Fun11Left[1]],
        [Fun11Left[0], Fun11Left[1]],
    );

    draw(
        KeyPoints2Dictionary(Fun11.value?.keypoints).right,
        KeyPoints2Dictionary(Fun12.value?.keypoints).left,
    );

    draw(
        KeyPoints2Dictionary(Fun21.value?.keypoints).top,
        KeyPoints2Dictionary(Fun12.value?.keypoints).bottom,
    );

    draw(
        KeyPoints2Dictionary(Fun31.value?.keypoints).top,
        KeyPoints2Dictionary(Fun11.value?.keypoints).bottom,
    );

    draw(
        KeyPoints2Dictionary(Fun33.value?.keypoints).top,
        KeyPoints2Dictionary(Fun21.value?.keypoints).bottom,
    );

    draw(
        KeyPoints2Dictionary(Fun32.value?.keypoints).top,
        KeyPoints2Dictionary(Fun21.value?.keypoints).left,
        [], undefined, undefined, true
    );

    const ModuleHt1Right = KeyPoints2Dictionary(ModuleHt1.value?.keypoints).right;
    const Fun41Left = KeyPoints2Dictionary(Fun42.value?.keypoints).left;

    draw(
        [ModuleHt1Right[0], Fun41Left[1]],
        KeyPoints2Dictionary(Fun31.value?.keypoints).bottom,
        [], undefined, undefined, false
    );

    draw(
        [ModuleHt1Right[0], Fun41Left[1]],
        KeyPoints2Dictionary(Fun32.value?.keypoints).bottom,
        [], undefined, undefined, false
    );

    draw(
        [ModuleHt1Right[0], Fun41Left[1]],
        KeyPoints2Dictionary(Fun33.value?.keypoints).bottom,
        [], undefined, undefined, false
    );

    draw(
        KeyPoints2Dictionary(ModuleXt.value?.keypoints).top,
        KeyPoints2Dictionary(Fun42.value?.keypoints).left,
        [], undefined, undefined, true
    );

    draw(
        KeyPoints2Dictionary(Fun12.value?.keypoints).right,
        KeyPoints2Dictionary(Fun22.value?.keypoints).top,
        [], undefined, undefined, false
    );

    draw(
        KeyPoints2Dictionary(Fun22.value?.keypoints).right,
        KeyPoints2Dictionary(Fun42.value?.keypoints).top,
        [], undefined, undefined, false
    );

    draw(
        KeyPoints2Dictionary(Fun12.value?.keypoints).right,
        [KeyPoints2Dictionary(ModuleCt2.value?.keypoints).left[0], ModuleCt1Right[1]],
    );

    draw(
        [KeyPoints2Dictionary(Fun42.value?.keypoints).right[0], Fun41Left[1]],
        [KeyPoints2Dictionary(ModuleHt2.value?.keypoints).left[0], Fun41Left[1]],
    );

    draw(
        KeyPoints2Dictionary(Fun42.value?.keypoints).left,
        KeyPoints2Dictionary(ModuleHt.value?.keypoints).bottom,
        []
    );
});

watchEffect(DrawArrow);

onMounted(() => {
    onUnmounted(resizeListener(container.value, DrawArrow));
    setTimeout(DrawArrow, 1000);
});
</script>

<style scoped>
td {
    padding: .5rem;
}
</style>

<style module>
.function>* {
    font-size: .8rem !important;
}
</style>
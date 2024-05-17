<template>
    <div ref="container">
        <table>
            <tr>
                <td v-for="j in 10" :key="j">
                    <div :class="$style.td">
                        <div :class="[
                            $style['patch-position-embedding'],
                            $style['patch-position-embedding-class'],
                        ]">{{ j - 1 }}</div>
                        <div :class="[
                            $style['patch-position-embedding'],
                            $style['patch-position-embedding-data'],
                        ]" ref="datas">
                            <MathDisplay content="\ast" v-if="j == 1" />
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td colspan="9">
                    <div style="padding-left: 17px;">
                        <NormalModule name="Linear Projection of Flattened Patches" :class="$style.module" />
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <template v-for="i in 3" :key="i">
                    <template v-for="j in 3" :key="j">
                        <td>
                            <div style="direction: rtl;">
                                <Image ref="img" style="margin: auto;" width="2rem" height="2rem"
                                    :src="useImageUrl(i - 1, j - 1)" />
                            </div>
                        </td>
                    </template>
                </template>
            </tr>
        </table>
    </div>

    <svg class="mask" ref="svg"></svg>
</template>

<script setup lang="ts">
import MathDisplay from "@/components/comp/MathDisplay.vue";
import Image from "@/components/modules/Image.vue";
import NormalModule from "@/components/modules/NormalModule.vue";
import { useColorStore } from "@/stores/color";
import useImageUrl from "./useImageUrl";

const colorStore = useColorStore();


import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";
import listAdd from "@/utils/listAdd";
import noError from "@/utils/noError";
import resizeSvg from "@/utils/resizeSvg";
import useDrawArrow from "@/utils/useDrawArrow";
import { ref, watchEffect } from "vue";


const container = ref<any>();
const svg = ref<any>();
const datas = ref<any>();

const img = ref<any>();

watchEffect(noError(() => {
    resizeSvg(svg, container);

    const { draw, clean } = useDrawArrow(svg.value);

    clean();

    const keypoints = [...img.value].map(x => KeyPoints2Dictionary(x.keypoints).top);

    const patch_dom = (datas.value[0] as HTMLDivElement).getBoundingClientRect();

    // 获取中点
    const patch_middle = patch_dom.left + patch_dom.width / 2;

    // console.log(keypoints, patch_middle, patch_dom.top);

    keypoints.forEach((keypoint) => {
        draw(
            listAdd(keypoint, [0, 0]),
            listAdd(keypoint, [0, -112]),
        );
    });

    draw(
        [patch_middle, patch_dom.top + patch_dom.height / 2],
        listAdd([patch_middle, patch_dom.top], [0, -19]),
    );

    draw(
        listAdd([patch_dom.left, patch_dom.top + patch_dom.height / 2], [-45, 0]),
        listAdd([patch_dom.left, patch_dom.top + patch_dom.height / 2], [-25, 0]),
    );
}));
</script>

<style module>
.patch-position-embedding {
    width: 1rem;
    height: 1.5rem;
    background-color: v-bind("colorStore.getColor('patch-position-embedding')");
    border: 2px solid #000;
    border-radius: .5em;
    margin: 0 -1px;

    /* 文字上下左右居中 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.patch-position-embedding-class {
    background-color: v-bind("colorStore.getColor('patch-position-embedding-class')");
}

.patch-position-embedding-data {
    background-color: v-bind("colorStore.getColor('patch-position-embedding-data')");
}

.td {
    display: flex;
    margin: 0 .42rem 0 .18rem;
}

.module {
    margin: .5rem 0 1.3rem 0;
}
</style>

<style scoped>
tr {
    margin: 1rem;
}
</style>
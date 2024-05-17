<template>
    <div>
        <table>
            <tr v-for="i in 3" :key="i">
                <td v-for="j in 3" :key="j" :class="$style.tr">
                    <Image ref="img" :src="`/vit/example_${i - 1}_${j - 1}.jpg`" width="2rem" height="2rem" />
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import Image from "@/components/modules/Image.vue";
import { ref } from "vue";

const img = ref<any>();

defineExpose({
    el: img
});
</script>

<style module>
.tr {
    padding: .2rem;
}
</style>
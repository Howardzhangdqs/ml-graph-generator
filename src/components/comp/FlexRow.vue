<template>
    <div class="flex-row" ref="self">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{
    gap?: string
}>(), {
    gap: "0"
});

const self = ref<any>();

defineExpose({
    el: self,
});
</script>

<style scoped>
.flex-row {
    display: flex;

    flex-direction: row;
    justify-content: center;

    gap: v-bind("props.gap");
}
</style>
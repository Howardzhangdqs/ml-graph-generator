<template>
    <div class="flex-width" ref="self">
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
.flex-width {
    display: flex;

    flex-direction: column;
    align-items: center;

    gap: v-bind("props.gap");
}

.flex-width > * {
    width: -webkit-fill-available;
}
</style>
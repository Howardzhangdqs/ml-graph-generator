<template>
    <div :style="{
        width: props.width,
        height: props.height,
    }"></div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    width?: string,
    height?: string,
}>(), {
    width: "1rem",
    height: "1rem",
});
</script>

<style scoped>

</style>
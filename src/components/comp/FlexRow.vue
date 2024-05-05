<template>
    <div class="flex-row">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    gap?: string
}>(), {
    gap: "0"
});
</script>

<style scoped>
.flex-row {
    display: flex;

    flex-direction: row;
    justify-content: space-evenly;

    gap: v-bind("props.gap");
}
</style>
<template>
    <div class="flex-width">
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
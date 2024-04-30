<template>
    <div>
        <div class="comp" ref="slot">
            <slot></slot>
        </div>
        <div class="info" v-if="props.name">{{ props.name }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{
    name?: string,
}>(), {
    name: "Module"
});

const slot = ref<HTMLDivElement>();
</script>

<style scoped>
.info {
    font-family: Consolas;

    text-align: center;
    margin: auto;
}

.comp {
    border: 1px dashed #0007;
    width: max-content;
    margin: auto;
}
</style>
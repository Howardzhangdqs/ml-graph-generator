<template>
    <div ref="main" class="math-display">
        <template v-if="props.math">
            <span v-html="katex.renderToString(props.content)"></span>
        </template>
        <template v-else>
            <span v-html="props.content"></span>
        </template>
    </div>
</template>

<script setup lang="ts">
import katex from "katex";
import { ref } from "vue";

const props = withDefaults(defineProps<{
    content?: string,
    math?: boolean,
}>(), {
    content: "\\mathcal{F}",
    math: true,
});

const main = ref<HTMLDivElement>();

defineExpose({
    dom: main
});
</script>

<style scoped>
.math-display {
    margin: auto;
    text-align: center;
    width: max-content;
    min-width: max-content;
}
</style>
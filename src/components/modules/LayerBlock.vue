<template>
    <div class="block-module">
        <slot>
            <NormalModule />
        </slot>
    </div>
</template>

<script setup lang="ts">
import NormalModule from "./NormalModule.vue";

const props = withDefaults(defineProps<{
    color?: string,
}>(), {
    color: "#ff02",
});

</script>

<style scoped>
.block-module {
    background-color: v-bind("props.color");

    padding: .3rem .5rem;

    border-radius: 0.7rem;
    border: 2px solid #333;

    width: max-content;

    /* margin: .5em; */
}
</style>
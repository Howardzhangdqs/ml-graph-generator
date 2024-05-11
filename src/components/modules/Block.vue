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
    color: "#ff01",
});

</script>

<style scoped>
.block-module {
    background-color: v-bind("props.color");

    padding: .5rem .8rem;

    border-radius: 0.7rem;
    border: 2px solid #333;

    width: max-content !important;

    display: flex;

    flex-direction: column;

    gap: .5rem;
}
</style>
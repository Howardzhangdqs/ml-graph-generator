<template>
    <template v-for="(item, key) in entries" :key>
        <RouterLink :to="item.path">
            <div :class="$style.btn">
                {{ item.name }}
            </div>
        </RouterLink>
    </template>
</template>

<script setup lang="ts">
import { routes } from ".";

const entries = routes
    .map(({ name, path }) => ({ name, path }))
    .filter(({ path }) => path !== "/");
</script>

<style module src="@/assets/button.css"></style>
<template>
    <div class="block-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.block-container {

    padding: .5rem .8rem;

    border-radius: 0.7rem;
    border: 2px solid #3330;

    width: max-content;
    
    display: flex;

    flex-direction: column;

    gap: .5rem;
}
</style>
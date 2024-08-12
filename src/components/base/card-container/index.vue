<template>
    <div class="card" :style="'padding:' + padding">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    // 内边距
    padding: {
        type: String,
        default: "3rem",
    },
});
</script>
<style lang="scss" scoped>
.card {
    background-color: #fff;
}
</style>

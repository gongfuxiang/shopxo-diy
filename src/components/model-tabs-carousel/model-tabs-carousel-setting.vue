<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-tabs-carousel-content :value="value.content" :tab-carousel-style="value.style"></model-tabs-carousel-content>
        </template>
        <template v-if="type == '2'">
            <model-tabs-carousel-styles :value="value.style" :content="value.content"></model-tabs-carousel-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
});
</script>
<style lang="scss" scoped>
</style>

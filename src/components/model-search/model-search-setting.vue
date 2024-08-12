<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-search-content :value="value.content"></model-search-content>
        </template>
        <template v-if="type == '2'">
            <model-search-styles :value="value.style" :content="value.content"></model-search-styles>
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
<style lang="scss" scoped></style>

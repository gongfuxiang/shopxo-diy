<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-tabs-content :value="value.content" :tab-style="value.style"></model-tabs-content>
        </template>
        <template v-if="type == '2'">
            <model-tabs-styles :value="value.style" :content="value.content" :tabs-style="value.content.tabs_theme"></model-tabs-styles>
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

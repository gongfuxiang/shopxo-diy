<template>
    <div class="setting-content">
        {{ tabs_active }}
        <template v-if="type == '1'">
            <model-tabs-carousel-content :value="value.content" :tabs-active="tabs_active" :tab-carousel-style="value.style"></model-tabs-carousel-content>
        </template>
        <template v-if="type == '2'">
            <model-tabs-carousel-styles :value="value.style" :tabs-active="tabs_active" :tabs-style="value.content.tabs_theme" :content="value.content"></model-tabs-carousel-styles>
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
const tabs_active = ref('tabs');
</script>
<style lang="scss" scoped></style>

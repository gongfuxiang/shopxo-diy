<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-tabs-magic-content :value="value.content" :tabs-active="tabs_active" :tab-carousel-style="value.style" @update:tabs="update_tabs"></model-tabs-magic-content>
        </template>
        <template v-if="type == '2'">
            <model-tabs-magic-styles :value="value.style" :tabs-active="tabs_active" :tabs-style="value.content.tabs_theme" :content="value.content" @update:tabs="update_tabs"></model-tabs-magic-styles>
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
const update_tabs = (val: string) => {
    if (val === 'common') {
        tabs_active.value = 'tabs';
    } else {
        tabs_active.value = val;
    }
};
</script>
<style lang="scss" scoped></style>

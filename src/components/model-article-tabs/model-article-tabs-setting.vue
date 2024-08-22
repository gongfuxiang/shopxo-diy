<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-article-tabs-content :value="value.content"></model-article-tabs-content>
        </template>
        <template v-else-if="type == '2'">
            <model-article-tabs-styles :value="value.style" :content="value.content"></model-article-tabs-styles>
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

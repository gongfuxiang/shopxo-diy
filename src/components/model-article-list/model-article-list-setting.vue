<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-article-list-content :value="value.content"></model-article-list-content>
        </template>
        <template v-else-if="type == '2'">
            <model-article-list-styles :value="value.style"></model-article-list-styles>
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

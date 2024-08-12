<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-video-content :value="value.content"></model-video-content>
        </template>
        <template v-else-if="type == '2'">
            <model-video-styles :value="value.style"></model-video-styles>
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

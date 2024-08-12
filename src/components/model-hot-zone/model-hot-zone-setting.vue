<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-hot-zone-content :value="value.content"></model-hot-zone-content>
        </template>
        <template v-else-if="type == '2'">
            <model-hot-zone-styles :value="value.style"></model-hot-zone-styles>
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

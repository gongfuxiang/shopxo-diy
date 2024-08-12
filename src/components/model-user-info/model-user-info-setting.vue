<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-user-info-content :value="value.content"></model-user-info-content>
        </template>
        <template v-else-if="type == '2'">
            <model-user-info-styles :value="value.style"></model-user-info-styles>
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

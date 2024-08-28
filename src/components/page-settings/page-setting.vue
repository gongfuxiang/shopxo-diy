<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <page-content :value="value.content"></page-content>
        </template>
        <template v-else-if="type == '2'">
            <page-styles :value="value.style"></page-styles>
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

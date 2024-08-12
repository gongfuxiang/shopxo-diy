<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-auxiliary-line-content :value="value.content"></model-auxiliary-line-content>
        </template>
        <template v-else-if="type == '2'">
            <model-auxiliary-line-styles :value="value.style"></model-auxiliary-line-styles>
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

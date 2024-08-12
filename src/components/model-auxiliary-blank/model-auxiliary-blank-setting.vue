<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-auxiliary-blank-content :value="value.content"></model-auxiliary-blank-content>
        </template>
        <template v-if="type == '2'">
            <model-auxiliary-blank-styles :value="value.style"></model-auxiliary-blank-styles>
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

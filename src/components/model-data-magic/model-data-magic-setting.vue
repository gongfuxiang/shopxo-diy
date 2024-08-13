<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-data-magic-content :value="value.content"></model-data-magic-content>
        </template>
        <template v-if="type == '2'">
            <model-data-magic-styles :value="value.style"></model-data-magic-styles>
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
<style lang="scss" scoped>
.auxiliary-line-setting {
    width: 100%;
}
</style>

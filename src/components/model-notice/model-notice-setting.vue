<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-notice-content :value="value.content"></model-notice-content>
        </template>
        <template v-if="type == '2'">
            <model-notice-styles :value="value.style" :content="value.content"></model-notice-styles>
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

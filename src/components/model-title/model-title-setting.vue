<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-title-content :value="value.content"></model-title-content>
        </template>
        <template v-if="type == '2'">
            <model-title-styles :value="value.style" :content="value.content"></model-title-styles>
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

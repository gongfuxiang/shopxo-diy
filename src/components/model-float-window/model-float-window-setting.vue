<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-float-window-content :value="value.content"></model-float-window-content>
        </template>
        <template v-if="type == '2'">
            <model-float-window-styles :value="value.style"></model-float-window-styles>
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

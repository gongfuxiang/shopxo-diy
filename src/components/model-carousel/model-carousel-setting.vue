<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-carousel-content :value="value.content"></model-carousel-content>
        </template>
        <template v-if="type == '2'">
            <model-carousel-styles :value="value.style" :content="value.content"></model-carousel-styles>
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

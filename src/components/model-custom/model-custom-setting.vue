<template>
    <div class="w">
        <template v-if="type == '1'">
            <model-custom-content :value="value.content"></model-custom-content>
        </template>
        <template v-if="type == '2'">
            <model-custom-styles :value="value.style" :content="value.content" ></model-custom-styles>
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

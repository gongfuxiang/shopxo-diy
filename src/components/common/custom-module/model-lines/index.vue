<template>
    <div :style="border_style"></div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
        required: true,
    },
    isDisplayPanel: {
        type: Boolean,
        default: false,
    },
    scale: {
        type: Number,
        default: 1,
    },
});
// 用于页面判断显示
const form = computed(() => props.value);

const border_style = computed(() => {
    if (form.value.line_settings === 'horizontal') {
        return `${set_count()} margin: 5px 0;border-bottom: ${form.value.line_size * props.scale}px ${form.value.line_style} ${form.value.line_color};`;
    } else {
        return `${set_count()} margin: 0 5px;border-right: ${form.value.line_size * props.scale}px ${form.value.line_style} ${form.value.line_color};`;
    }
});
const set_count = () => {
    if (form.value.line_settings === 'horizontal') {
        return `width: ${form.value.com_width}px;`;
    } else {
        return `height: ${form.value.com_height}px;`;
    }
};
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    height: 100%;
    width: 100%;
    .el-image__inner {
        object-fit: cover;
    }
    .image-slot img {
        width: 3rem;
    }
}
</style>

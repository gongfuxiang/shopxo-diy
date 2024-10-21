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
    isPercentage: {
        type: Boolean,
        default: false,
    },
    scale: {
        type: Number,
        default: 1,
    },
});
// 用于页面判断显示
const form = reactive(props.value);

const border_style = computed(() => {
    if (form.line_settings === 'horizontal') {
        return `${set_count()} margin: 5px 0;border-bottom: ${form.line_size * props.scale}px ${form.line_style} ${form.line_color};`;
    } else {
        return `${set_count()} margin: 0 5px;border-right: ${form.line_size * props.scale}px ${form.line_style} ${form.line_color};`;
    }
});
const set_count = () => {
    if (form.line_settings === 'horizontal') {
        return `width: ${form.com_width}px;`;
    } else {
        return `height: ${form.com_height}px;`;
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

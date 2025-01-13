<template>
    <div v-if="is_show" :style="border_style"></div>
</template>
<script setup lang="ts">
import { get_is_eligible } from '@/utils';
import { isEmpty } from 'lodash';
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
    sourceList: {
        type: Object,
        default: () => {
            return {};
        }
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    isCustomGroup: {
        type: Boolean,
        default: false
    },
    customGroupFieldId: {
        type: String,
        default: ''
    },
    scale: {
        type: Number,
        default: 1,
    },
});
// 用于页面判断显示
const form = computed(() => props.value);
// 从组件的顶层获取数据，避免多层组件传值导致数据遗漏和多余代码
const field_list: any = toRef(inject('field_list', []));
const is_show = computed(() => {
    // 取出条件判断的内容
    const condition = form.value?.condition || { field: '', type: '', value: '' };
    return get_is_eligible(field_list.value, condition, props);
});
// 边框样式
const border_style = computed(() => {
    if (form.value.line_settings === 'horizontal') {
        return `${set_count()} margin: 5px 0;border-bottom: ${form.value.line_size * props.scale}px ${form.value.line_style} ${form.value.line_color};`;
    } else {
        return `${set_count()} margin: 0 5px;border-right: ${form.value.line_size * props.scale}px ${form.value.line_style} ${form.value.line_color};`;
    }
});
// 不同地方下的宽度显示
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

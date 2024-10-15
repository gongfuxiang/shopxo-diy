<template>
    <div class="img-outer re oh flex-row w h" :style="com_style">
        <template v-if="!isEmpty(form.icon_class)">
            <icon :name="form.icon_class" :color="form.icon_color" :size="form.icon_size + ''"></icon>
        </template>
        <template v-else>
            <image-empty v-model="form.icon_class"></image-empty>
        </template>
    </div>
</template>
<script setup lang="ts">
import { radius_computer, padding_computer, gradient_handle } from '@/utils';
import { isEmpty } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
        required: true
    },
    sourceList: {
        type: Object,
        default: () => {
            return {};
        }
    },
    isPercentage: {
        type: Boolean,
        default: false
    },
    scale: {
        type: Number,
        default: 1
    }
});
// 用于页面判断显示
const form = reactive(props.value);

const com_style = computed(() => {
    let style = `${ set_count() } ${ gradient_handle(form.color_list, form.direction) } ${ radius_computer(form.bg_radius, props.scale) };transform: rotate(${form.icon_rotate}deg);${ padding_computer(form.icon_padding, props.scale) };`;
    if (form.border_show == '1') {
        style += `border: ${form.border_size * props.scale}px ${form.border_style} ${form.border_color};box-sizing: border-box;`;
    }
    if (form.icon_location == 'center') {
        style += `justify-content: center;`;
    } else if (form.icon_location == 'left') {
        style += `justify-content: flex-start;`;
    } else if (form.icon_location == 'right') {
        style += `justify-content: flex-end;`;
    }
    return style;
});
const set_count = () => {
    if (props.isPercentage) {
        return '';
    } else {
        return `width: ${ form.com_width }px; height: ${ form.com_height }px;`;
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
        width: 2rem;
    }
}
</style>

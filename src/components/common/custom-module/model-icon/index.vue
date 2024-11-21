<template>
    <div class="img-outer re oh flex-row w h" :style="com_style">
        <template v-if="!isEmpty(icon_class)">
            <icon :name="icon_class" :color="form.icon_color" :size="form.icon_size + ''"></icon>
        </template>
        <template v-else>
            <image-empty v-model="icon_class"></image-empty>
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
    },
    sourceType: {
        type: String,
        default: ''
    }
});
// 用于页面判断显示
const form = computed(() => props.value);

const icon_class = computed(() => {
    if (!isEmpty(form.value.icon_class)) {
        return form.value.icon_class;
    } else {
        if (!isEmpty(props.sourceList)) {
            // 不输入商品， 文章和品牌时，从外层处理数据
            let icon = props.sourceList[form.value.data_source_id];
            // 如果是商品,品牌，文章的图片， 其他的切换为从data中取数据
            if (['goods', 'article', 'brand'].includes(props.sourceType) && !isEmpty(props.sourceList.data)) {
                icon = props.sourceList.data[form.value.data_source_id];
            }
            return icon;
        } else {
            return '';
        }
    }
});
const com_style = computed(() => {
    let style = `${ set_count() } ${ gradient_handle(form.value.color_list, form.value.direction) } ${ radius_computer(form.value.bg_radius, props.scale) };transform: rotate(${form.value.icon_rotate}deg);${ padding_computer(form.value.icon_padding, props.scale) };`;
    if (form.value.border_show == '1') {
        style += `border: ${form.value.border_size * props.scale}px ${form.value.border_style} ${form.value.border_color};box-sizing: border-box;`;
    }
    if (form.value.icon_location == 'center') {
        style += `justify-content: center;`;
    } else if (form.value.icon_location == 'left') {
        style += `justify-content: flex-start;`;
    } else if (form.value.icon_location == 'right') {
        style += `justify-content: flex-end;`;
    }
    return style;
});
const set_count = () => {
    if (props.isPercentage) {
        return '';
    } else {
        return `width: ${ form.value.com_width }px; height: ${ form.value.com_height }px;`;
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

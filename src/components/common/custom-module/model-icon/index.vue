<template>
    <div v-if="is_show" class="img-outer re oh flex-row w h" :style="com_style">
        <template v-if="!isEmpty(icon_class)">
            <icon :name="icon_class" :color="form.icon_color" :size="form.icon_size + ''"></icon>
        </template>
        <template v-else>
            <image-empty v-model="icon_class"></image-empty>
        </template>
    </div>
</template>
<script setup lang="ts">
import { radius_computer, padding_computer, gradient_handle, get_nested_property, get_is_eligible } from '@/utils';
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
    isDisplayPanel: {
        type: Boolean,
        default: false
    },
    scale: {
        type: Number,
        default: 1
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
    configLoop: {
        type: String,
        default: '1'
    }
});
// 用于页面判断显示
const form = computed(() => props.value);
// 从组件的顶层获取数据，避免多层组件传值导致数据遗漏和多余代码
const field_list: any = toRef(inject('field_list', []));
const is_show = computed(() => {
    if (props.configLoop == '1') {
        // 取出条件判断的内容
        const condition = form.value?.condition || { field: '', type: '', value: '' };
        return get_is_eligible(field_list.value, condition, props);
    } else {
        return true;
    }
});
// 图标样式
const icon_class = computed(() => {
    if (!isEmpty(form.value.icon_class)) {
        return form.value.icon_class;
    } else {
        if (!isEmpty(props.sourceList)) {
            let icon = '';
            // 取出数据源ID
            const data_source_id = !isEmpty(form.value?.data_source_field?.id || '') && props.configLoop == '1' ? form.value?.data_source_field?.id : '';
            // 数据源内容
            const option = form.value?.data_source_field?.option || {};
            if (data_source_id.includes(';')) {
                // 取出所有的字段，使用;分割
                const ids = data_source_id.split(';');
                let text = '';
                ids.forEach((item: string, index: number) => {
                    text += data_handling(item) + (index != ids.length - 1 ? (option?.join || '') : '');
                });
                icon = text;
            } else {
                // 不输入商品， 文章和品牌时，从外层处理数据
                icon = data_handling(data_source_id);
            }
            return (option?.first || '') + icon + (option?.last || '');
        } else {
            return '';
        }
    }
});
// 数据处理
const data_handling = (data_source_id: string) => {
    // 不输入商品， 文章和品牌时，从外层处理数据
    let icon = get_nested_property(props.sourceList, data_source_id);
    // 如果是商品,品牌，文章的图片， 其他的切换为从data中取数据
    if (!isEmpty(props.sourceList.data) && props.isCustom) {
        icon = get_nested_property(props.sourceList.data, data_source_id);
    }
    return icon;
}
// 外层样式
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
// 不同地方下的样式
const set_count = () => {
    if (props.isDisplayPanel) {
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

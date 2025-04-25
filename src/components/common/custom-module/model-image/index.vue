<template>
    <div v-if="is_show" class="img-outer re w h" :style="border_style">
        <image-empty v-model="img" :style="image_style"></image-empty>
    </div>
</template>
<script setup lang="ts">
import { percentage_count, radius_computer, get_nested_property, get_is_eligible } from '@/utils';
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
    imgParams: {
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
// 图片地址
const img = computed(() => {
    if (!isEmpty(form.value.img[0])) {
        return form.value.img[0];
    } else {
        if (!isEmpty(props.sourceList)) {
            let image_url = '';
            // 取出数据源ID
            const data_source_id = !isEmpty(form.value?.data_source_field?.id || '') && props.configLoop == '1' ? form.value?.data_source_field?.id : '';
            // 数据源内容
            const option = form.value?.data_source_field?.option || {};
            // 如果是商品,品牌，文章的图片， 其他的切换为从data中取数据
            if (data_source_id.includes(';')) {
                // 取出所有的字段，使用;分割
                const ids = data_source_id.split(';');
                let url = '';
                ids.forEach((item: string, index: number) => {
                    url += data_handling(item) + (index != ids.length - 1 ? (option?.join || '') : '');
                });
                image_url = url;
            } else {
                // 循环取值,使用reduce 累加函数循环取值
                image_url = data_handling(data_source_id);
            }
            return (option?.first || '') + image_url + (option?.last || '');
        } else {
            return '';
        }
    }
});
// 数据处理
const data_handling = (data_source_id: string) => {
    // 循环取值,使用reduce 累加函数循环取值
    let image_url = get_nested_property(props.sourceList, data_source_id);
    // 如果是商品,品牌，文章的图片， 其他的切换为从data中取数据
    if (!isEmpty(props.sourceList.data) && props.isCustom) {
        if (data_source_id == props.imgParams) {
            image_url = !isEmpty(props.sourceList.new_cover)? props.sourceList.new_cover[0]?.url || '' : get_nested_property(props.sourceList.data, data_source_id);
        } else {
            image_url = get_nested_property(props.sourceList.data, data_source_id);
        }
    }
    if (Array.isArray(image_url)) {
        // 如果是数组，使用 join 方法转换为字符串
        image_url = image_url.join(', ');
    }
    return image_url;
}
// 图片的样式
const image_style = computed(() => {
    return `${ set_count() };transform: rotate(${form.value.img_rotate}deg); ${ radius_computer(form.value.img_radius, props.scale) };`;
});
// 边框样式
const border_style = computed(() => {
    let style = ``;
    if (form.value.border_show == '1') {
        style += `border: ${form.value.border_size * props.scale}px ${form.value.border_style} ${form.value.border_color}; ${ radius_computer(form.value.border_radius, props.scale) };`
    }
    return style;
});
// 不同地方下的宽度显示
const set_count = () => {
    if (props.isDisplayPanel) {
        return `width: ${ percentage_count(form.value.img_width, form.value.com_width) }; height: ${ percentage_count(form.value.img_height, form.value.com_height) };`;
    } else {
        return `width: ${form.value.img_width}px; height: ${form.value.img_height}px;`;
    }
};
</script>
<style lang="scss" scoped>
.img-outer {
    overflow: hidden;
}
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

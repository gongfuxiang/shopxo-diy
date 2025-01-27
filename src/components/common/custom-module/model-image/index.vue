<template>
    <div class="img-outer re w h" :style="border_style">
        <image-empty v-model="img" :style="image_style"></image-empty>
    </div>
</template>
<script setup lang="ts">
import { percentage_count, radius_computer, get_nested_property } from '@/utils';
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
    imgParams: {
        type: String,
        default: ''
    }
});
// 用于页面判断显示
const form = computed(() => props.value);

const img = computed(() => {
    if (!isEmpty(form.value.img[0])) {
        return form.value.img[0];
    } else {
        if (!isEmpty(props.sourceList)) {
            let image_url = '';
            // 取出数据源ID
            const data_source_id = !isEmpty(form.value?.data_source_field?.id || '') ? form.value?.data_source_field?.id : '';
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
    return image_url;
}

const image_style = computed(() => {
    return `${ set_count() };transform: rotate(${form.value.img_rotate}deg); ${ radius_computer(form.value.img_radius, props.scale) };`;
});

const border_style = computed(() => {
    let style = ``;
    if (form.value.border_show == '1') {
        style += `border: ${form.value.border_size * props.scale}px ${form.value.border_style} ${form.value.border_color}; ${ radius_computer(form.value.border_radius, props.scale) };`
    }
    return style;
});
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

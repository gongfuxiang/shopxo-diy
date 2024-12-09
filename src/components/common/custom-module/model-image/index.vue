<template>
    <div class="img-outer re w h" :style="border_style">
        <image-empty v-model="img" :style="image_style"></image-empty>
    </div>
</template>
<script setup lang="ts">
import { percentage_count, radius_computer } from '@/utils';
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
            // 不输入商品， 文章和品牌时，从外层处理数据
            let image_url = props.sourceList[form.value.data_source_id];
            // 如果是商品,品牌，文章的图片， 其他的切换为从data中取数据
            if (!isEmpty(props.sourceList.data) && props.isCustom) {
                if (form.value.data_source_id == props.imgParams) {
                    image_url = !isEmpty(props.sourceList.new_cover)? props.sourceList.new_cover[0]?.url || '' : props.sourceList.data[props.imgParams];
                } else {
                    image_url = props.sourceList.data[form.value.data_source_id];
                }
            }
            return image_url;
        } else {
            return '';
        }
    }
});

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
    if (props.isPercentage) {
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

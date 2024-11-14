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
    sourceType: {
        type: String,
        default: '',
    }
});

const keyMap: { [key: string]: string } = {
    goods: 'images',
    article: 'cover',
    brand: 'logo'
};

// 用于页面判断显示
const form = reactive(props.value);
const img = computed(() => {
    if (!isEmpty(form.img[0])) {
        return form.img[0];
    } else {
        if (!isEmpty(props.sourceList)) {
            // 不输入商品， 文章和品牌时，从外层处理数据
            let image_url = props.sourceList[form.data_source_id];
            // 如果是商品,品牌，文章的图片， 其他的切换为从data中取数据
            if (['goods', 'article', 'brand'].includes(props.sourceType) && !isEmpty(props.sourceList.data)) {
                if (form.data_source_id == keyMap[props.sourceType]) {
                    image_url = !isEmpty(props.sourceList.new_cover)? props.sourceList.new_cover[0]?.url || '' : props.sourceList.data[keyMap[props.sourceType]];
                } else {
                    image_url = props.sourceList.data[form.data_source_id];
                }
            }
            return image_url;
        } else {
            return '';
        }
    }
});

const image_style = computed(() => {
    return `${ set_count() };transform: rotate(${form.img_rotate}deg); ${ radius_computer(form.img_radius, props.scale) };`;
});

const border_style = computed(() => {
    let style = ``;
    if (form.border_show == '1') {
        style += `border: ${form.border_size * props.scale}px ${form.border_style} ${form.border_color}; ${ radius_computer(form.border_radius, props.scale) };`
    }
    return style;
});
const set_count = () => {
    if (props.isPercentage) {
        return `width: ${ percentage_count(form.img_width, form.com_width) }; height: ${ percentage_count(form.img_height, form.com_height) };`;
    } else {
        return `width: ${form.img_width}px; height: ${form.img_height}px;`;
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

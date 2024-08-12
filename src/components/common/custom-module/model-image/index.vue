<template>
    <div class="img-outer re w h" :style="border_style">
        <image-empty v-model="img_src" :style="image_style"></image-empty>
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
    isPercentage: {
        type: Boolean,
        default: false
    }
});
// 用于页面判断显示
const form = reactive(props.value);

const img_src = computed(() => {
    if (!isEmpty(form.img_src[0])) {
        return form.img_src[0];
    } else {
        return {
            url: form.data_source_list.url
        }
    }
});

const image_style = computed(() => {
    return `${ set_count() };transform: rotate(${form.img_rotate}deg); ${ radius_computer(form.img_radius) };`;
});

const border_style = computed(() => {
    let style = ``;
    if (form.border_show) {
        style += `border: ${form.border_size}px ${form.border_style} ${form.border_color}; ${ radius_computer(form.border_radius) };`
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

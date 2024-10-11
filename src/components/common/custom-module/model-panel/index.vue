<template>
    <div class="w h re oh" :style="com_style">
        <div class="w h" :style="com_img_style"></div>
    </div>
</template>
<script setup lang="ts">
import { radius_computer, gradient_handle, background_computer } from '@/utils';
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
    }
});
// 用于页面判断显示
const form = reactive(props.value);

const com_style = computed(() => {
    let style = `${ set_count() } ${ gradient_handle(form.color_list, form.direction) } ${ radius_computer(form.bg_radius) }; transform: rotate(${form.panel_rotate}deg);`;
    if (form.border_show == '1') {
        style += `border: ${form.border_size}px ${form.border_style} ${form.border_color};`;
    }
    return style;
});

const com_img_style = computed(() => {
    const data = {
        background_img: form?.background_img || [],
        background_img_style: form?.background_img_style || '2'
    }
    return background_computer(data);
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
</style>

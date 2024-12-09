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
    isDisplayPanel: {
        type: Boolean,
        default: false
    },
    scale: {
        type: Number,
        default: 1
    }
});
// 用于页面判断显示
const form = computed(() => props.value);

const com_style = computed(() => {
    let style = `${ set_count() } ${ gradient_handle(form.value.color_list, form.value.direction) } ${ radius_computer(form.value.bg_radius, props.scale) }; transform: rotate(${form.value.panel_rotate}deg);`;
    if (form.value.border_show == '1') {
        style += `border: ${form.value.border_size * props.scale }px ${form.value.border_style} ${form.value.border_color};`;
    }
    return style;
});

const com_img_style = computed(() => {
    const data = {
        background_img: form.value?.background_img || [],
        background_img_style: form.value?.background_img_style || '2'
    }
    return background_computer(data);
});
const set_count = () => {
    if (props.isDisplayPanel) {
        return '';
    } else {
        return `width: ${ form.value.com_width }px; height: ${ form.value.com_height }px;`;
    }
};
</script>
<style lang="scss" scoped>
</style>

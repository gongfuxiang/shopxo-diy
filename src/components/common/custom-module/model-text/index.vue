<template>
    <div class="img-outer re" :style="com_style">
        <div :style="text_style">{{ form.text_title }}</div>
    </div>
</template>
<script setup lang="ts">
import { radius_computer, padding_computer } from '@/utils';
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

const text_style = computed(() => {
    let style = `font-size: ${ form.text_size }px;color: ${ form.text_color }; text-align: ${ form.text_location }; transform: rotate(${form.text_rotate}deg);text-decoration: ${ form.text_option };${ padding_computer(form.text_padding) };`;
    if (form.text_weight == 'italic') {
        style += `font-style: italic`;
    } else if (form.text_weight == '500') {
        style += `font-weight: 500`;
    }
    return style;
});

const com_style = computed(() => {
    let style = `${ set_count() } background-color: ${ form.com_bg };`;
    if (form.border_show) {
        style += `border: ${form.border_size}px ${form.border_style} ${form.border_color}; ${ radius_computer(form.border_radius) };`;
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
<style lang="scss" scoped></style>

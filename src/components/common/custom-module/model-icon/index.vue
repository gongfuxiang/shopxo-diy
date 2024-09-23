<template>
    <div class="img-outer re oh" :style="com_style">
        <div :style="icon_style" class="flex-row">
            <icon :name="form.icon_class" :color="form.icon_color" :size="form.icon_size"></icon>
        </div>
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
    let style = `${ set_count() } background-color: ${ form.com_bg }; ${ radius_computer(form.bg_radius) }`;
    if (form.border_show == '1') {
        style += `border: ${form.border_size}px ${form.border_style} ${form.border_color};`;
    }
    return style;
});

const icon_style = computed(() => {
    let style = `transform: rotate(${form.icon_rotate}deg);${ padding_computer(form.icon_padding) };`;
    if (form.icon_location == 'center') {
        style += `justify-content: center;`;
    } else if (form.icon_location == 'left') {
        style += `justify-content: flex-start;`;
    } else if (form.icon_location == 'right') {
        style += `justify-content: flex-end;`;
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
<style lang="scss" scoped>
</style>

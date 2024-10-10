<template>
    <div :style="style_container">
        <div :style="style_img_container">
            <div :style="style"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_img_computer, common_styles_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
// 用于页面判断显示
const state = reactive({
    form: props.value.content,
    new_style: props.value.style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

const style = computed(() => `height: ${form.value.height}px;background: ${new_style.value.line_color || 'transparent'};`);
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
</script>
<style lang="scss" scoped></style>

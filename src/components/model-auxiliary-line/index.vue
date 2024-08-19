<template>
    <div :style="style_container">
        <div :style="style"></div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});

const style = ref('');
const style_container = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        let border_content = `border-bottom-style: ${new_content?.styles || 'solid'};`;
        let border_style = `border-bottom-width: ${new_style.line_width || 1}px; border-bottom-color: ${new_style.line_color || 'rgba(204, 204, 204, 1)'};`;
        style.value = border_content + border_style;

        style_container.value = common_styles_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

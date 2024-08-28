<template>
    <div :style="style_container">
        <div class="content re" :style="style_content"></div>
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

const style_content = ref('');
const style_container = ref('');
const content = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        style_container.value = common_styles_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.content {
    height: 22rem;
}
</style>

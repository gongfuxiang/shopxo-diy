<template>
    <div class="rich-text" :style="style_container">
        <div class="rich-text-content" :innerHTML="safe_content"></div>
    </div>
</template>
<script lang="ts" setup>
import { common_styles_computer } from '@/utils';
// 引入dompurify模块 安全地清理HTML内容，确保插入到DOM中的内容不会导致XSS攻击。
import DOMPurify from 'dompurify';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const style_container = ref('');
const content = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        content.value = new_content.html;
        style_container.value = common_styles_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
// 计算
const safe_content = computed(() => DOMPurify.sanitize(content.value));
</script>
<style lang="scss" scoped>
.rich-text-content {
    white-space: normal;
    word-break: break-all;
    * {
        max-width: 100%;
    }
}
</style>

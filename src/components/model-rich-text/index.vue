<template>
    <div class="rich-text" :style="style_container">
        <div :style="style_img_container">
            <div class="rich-text-content" :innerHTML="safe_content"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { common_img_computer, common_styles_computer } from '@/utils';
// 引入dompurify模块 安全地清理HTML内容，确保插入到DOM中的内容不会导致XSS攻击。
import DOMPurify from 'dompurify';
/**
 * @description: 富文本（渲染）
 * @param value{Object} 传过来的数据，用于数据渲染
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const style_container = ref('');
const style_img_container = ref('');
const content = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        content.value = new_content.html;
        style_container.value = common_styles_computer(new_style.common_style);
        style_img_container.value = common_img_computer(new_style.common_style);
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

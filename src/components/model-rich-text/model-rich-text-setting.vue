<template>
    <div class="rich-text-setting w">
        <template v-if="type == '1'">
            <model-rich-text-content :value="value.content"></model-rich-text-content>
        </template>
        <template v-else-if="type == '2'">
            <model-rich-text-styles :value="value.style"></model-rich-text-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 富文本（设置）
 * @param type{String} 类型（1：内容，2：样式）
 * @param value{Object} 传过来的数据，用于数据渲染
 */
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
});
</script>

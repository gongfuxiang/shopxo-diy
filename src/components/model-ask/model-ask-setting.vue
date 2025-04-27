<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-ask-content :value="value.content" :styles="value.style"></model-ask-content>
        </template>
        <template v-else-if="type == '2'">
            <model-ask-styles :value="value.style" :content="value.content"></model-ask-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 文章选项卡列表（设置）
 * @param type{String} 类型是进入内容组件还是样式组件
 * @param value{Object} 样式数据
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

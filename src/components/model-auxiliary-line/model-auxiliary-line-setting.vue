<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-auxiliary-line-content :value="value.content"></model-auxiliary-line-content>
        </template>
        <template v-else-if="type == '2'">
            <model-auxiliary-line-styles :value="value.style"></model-auxiliary-line-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 辅助线（设置）
 * @param type{String} 类型（1：内容，2：样式）
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

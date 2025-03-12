<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-salerecords-content :value="props.value.content" :styles="props.value.style"></model-salerecords-content>
        </template>
        <template v-else-if="type == '2'">
            <model-salerecords-styles :value="props.value.style" :content="props.value.content"></model-salerecords-styles>
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

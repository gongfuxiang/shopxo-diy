<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-article-list-content :value="value.content" :styles="value.style" :default-config="data_config"></model-article-list-content>
        </template>
        <template v-else-if="type == '2'">
            <model-article-list-styles :value="value.style" :content="value.content" :default-config="data_config"></model-article-list-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 文章列表（切换）
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
const data_config = reactive({
    // 图片不同风格下的圆角
    img_radius_0: 4,
    img_radius_1: 0,
});
</script>

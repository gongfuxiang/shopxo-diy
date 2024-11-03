<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-article-list-content :value="form.content" :styles="form.style" :default-config="data_config" @theme_change="theme_change"></model-article-list-content>
        </template>
        <template v-else-if="type == '2'">
            <model-article-list-styles :value="form.style" :content="form.content" :default-config="data_config"></model-article-list-styles>
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
const data_config = reactive({
    // 图片不同风格下的圆角
    img_radius_0: 4,
    img_radius_1: 0,
});
const form = ref(props.value);
const theme_change = (val: number) => {
    if (val) {
        form.value.style.article_height = val;
    }
};
</script>

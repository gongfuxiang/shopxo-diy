<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-article-tabs-content :value="form.content" :tab-style="form.style" :default-config="data_config"></model-article-tabs-content>
        </template>
        <template v-else-if="type == '2'">
            <model-article-tabs-styles :value="form.style" :content="form.content" :tabs-style="form.content.tabs_theme" :default-config="data_config"></model-article-tabs-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 文章选项卡列表 （设置）
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
const data_config = reactive({
    // 图片不同风格下的圆角
    img_radius_0: 4,
    img_radius_1: 0,
});
const form = ref(props.value);
</script>

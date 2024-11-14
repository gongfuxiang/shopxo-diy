<template>
    <div :style="style_container">
        <div :style="style_img_container">
            <div :style="tabs_padding_style">
                <tabs-view ref="tabs" :value="article_tabs" :active-index="tabs_active_index"></tabs-view>
            </div>
            <div class="pt-10">
                <model-article-list :value="article_tabs" :is-common-style="false"></model-article-list>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_img_computer, common_styles_computer, padding_computer } from '@/utils';
import { cloneDeep } from 'lodash';
/**
 * @description: 文章选项卡列表 （渲染）
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
const article_tabs = ref({});
const tabs_active_index = ref(0);
const tabs_padding_style = ref('');
watch(
    () => props.value,
    (val) => {
        const newVal = cloneDeep(val);
        const new_style = newVal?.style;
        let new_data = newVal;
        tabs_active_index.value = new_data.content.tabs_active_index;
        // 选项卡内边距
        tabs_padding_style.value = padding_computer(new_style?.tabs_padding);
        new_data.content.theme = new_data.content.article_theme;
        new_data.content.data_type = new_data.content.tabs_list[tabs_active_index.value].data_type;
        new_data.content.keyword = new_data.content.tabs_list[tabs_active_index.value].keyword;
        new_data.content.category_ids = new_data.content.tabs_list[tabs_active_index.value].category_ids;
        new_data.content.carousel_col = new_data.content.article_carousel_col;
        new_data.content.data_list = new_data.content.tabs_list[tabs_active_index.value].data_list;
        new_data.content.data_auto_list = new_data.content.tabs_list[tabs_active_index.value].data_auto_list;
        new_data.content.data_ids = new_data.content.tabs_list[tabs_active_index.value].data_ids;
        new_data.content.number = new_data.content.tabs_list[tabs_active_index.value].number;
        new_data.content.order_by_type = new_data.content.tabs_list[tabs_active_index.value].order_by_type;
        new_data.content.order_by_rule = new_data.content.tabs_list[tabs_active_index.value].order_by_rule;
        new_data.content.field_show = new_data.content.field_show;
        new_data.content.is_cover = new_data.content.tabs_list[tabs_active_index.value].is_cover;
        article_tabs.value = new_data;

        style_container.value = common_styles_computer(new_style.common_style);
        style_img_container.value = common_img_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

<template>
    <div :style="style_container">
        <tabs-view ref="tabs" :value="article_tabs" :active-index="tabs_active_index"></tabs-view>
        <div class="pt-10">
            <model-article-list :value="article_tabs" :is-common-style="false"></model-article-list>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';
import { cloneDeep } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const style_container = ref('');
const article_tabs = ref({});
const tabs_active_index = ref(0);
watch(
    () => props.value,
    (val) => {
        const newVal = cloneDeep(val);
        const new_style = newVal?.style;
        let new_data = newVal;
        tabs_active_index.value = new_data.content.tabs_active_index;
        new_data.content.theme = new_data.content.article_theme;
        new_data.content.data_type = new_data.content.tabs_list[tabs_active_index.value].data_type;
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

        style_container.value += common_styles_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

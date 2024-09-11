<template>
    <div :style="style_container">
        <tabs-view ref="tabs" :value="article_tabs"></tabs-view>
        <div class="pt-10">
            <model-article-list :value="article_tabs" :is-common-style="false"></model-article-list>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const style_container = ref('');
const article_tabs = ref(props.value);
watch(
    article_tabs.value,
    (newVal, oldValue) => {
        const new_style = newVal?.style;
        let new_data = newVal;
        new_data.content.theme = new_data.content.article_theme;
        new_data.content.data_type = new_data.content.tabs_list[0].data_type;
        new_data.content.category = new_data.content.tabs_list[0].category;
        new_data.content.carousel_col = new_data.content.article_carousel_col;
        new_data.content.data_list = new_data.content.tabs_list[0].data_list;
        new_data.content.data_ids = new_data.content.tabs_list[0].data_ids;
        new_data.content.number = new_data.content.tabs_list[0].number;
        new_data.content.sort = new_data.content.tabs_list[0].sort;
        new_data.content.sort_rules = new_data.content.tabs_list[0].sort_rules;
        new_data.content.field_show = new_data.content.field_show;
        new_data.content.is_cover = new_data.content.tabs_list[0].is_cover;
        article_tabs.value = new_data;
        style_container.value += common_styles_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

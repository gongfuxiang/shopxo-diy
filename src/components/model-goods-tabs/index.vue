<template>
    <div :style="style_container">
        <div :style="style_img_container">
            <div :style="tabs_padding_style">
                <tabs-view ref="tabs" :value="props.value" :active-index="tabs_active_index"></tabs-view>
            </div>
            <div class="pt-10">
                <model-goods-list :value="tabs_list" :is-common-style="false"></model-goods-list>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_img_computer, common_styles_computer, padding_computer } from '@/utils';
import { cloneDeep } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

const style_container = ref('');
const style_img_container = ref('');
const tabs_list = ref({});
const tabs_active_index = ref(0);
const tabs_padding_style = ref('');
watch(
    () => props.value,
    (val) => {
        const new_val = cloneDeep(val);
        const new_style = new_val?.style;
        let new_data = new_val;
        tabs_active_index.value = new_data.content.tabs_active_index;
        tabs_padding_style.value = padding_computer(new_style?.tabs_padding);
        // 产品的值
        new_data.content.data_type = new_data.content.tabs_list[tabs_active_index.value].data_type;
        new_data.content.keyword = new_data.content.tabs_list[tabs_active_index.value].keyword;
        new_data.content.category_ids = new_data.content.tabs_list[tabs_active_index.value].category_ids;
        new_data.content.brand_ids = new_data.content.tabs_list[tabs_active_index.value].brand_ids;
        new_data.content.number = new_data.content.tabs_list[tabs_active_index.value].number;
        new_data.content.order_by_type = new_data.content.tabs_list[tabs_active_index.value].order_by_type;
        new_data.content.order_by_rule = new_data.content.tabs_list[tabs_active_index.value].order_by_rule;
        new_data.content.data_list = new_data.content.tabs_list[tabs_active_index.value].data_list;
        new_data.content.data_auto_list = new_data.content.tabs_list[tabs_active_index.value].data_auto_list;

        tabs_list.value = new_data;
        // 公共样式
        style_container.value += common_styles_computer(new_style.common_style);
        style_img_container.value = common_img_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

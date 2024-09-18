<template>
    <div :style="style_container">
        <tabs-view ref="tabs" :value="props.value" :active-index="tabs_active_index"></tabs-view>
        <div class="pt-10">
            <model-goods-list :value="tabs_list" :is-common-style="false"></model-goods-list>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';
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
const tabs_list = ref({});
const tabs_active_index = ref(0);
watch(
    () => props.value,
    (val) => {
        console.log('1');
        const new_val = cloneDeep(val);
        const new_style = new_val?.style;
        let new_data = new_val;
        tabs_active_index.value = new_data.content.tabs_active_index;
        // 产品的值
        new_data.content.data_type = new_data.content.tabs_list[tabs_active_index.value].data_type;
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
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

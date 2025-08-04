<template>
    <model-goods-list :value="props.value" :new-list="data_source_content_list" :is-use-auto="false" :is-common-style="isCommonStyle"></model-goods-list>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    isCommonStyle: {
        type: Boolean,
        default: true,
    },
});

const form = computed(() => props.value?.content || {});

const default_list = {
    title: '测试商品标题',
    min_original_price: '41.2',
    show_original_price_symbol: '￥',
    show_original_price_unit: '/ 台',
    min_price: '51',
    show_price_symbol: '￥',
    show_price_unit: '/ 台',
    sales_count: '1000',
    images: '',
    new_cover: [],
    is_error: 0,
    plugins_view_icon_data: [
        {
            name: '满减活动',
            bg_color: '#EA3323',
            br_color: '',
            color: '#fff',
            url: '',
        },
        {
            name: '包邮',
            bg_color: '',
            br_color: '#EA3323',
            color: '#EA3323',
            url: '',
        },
        {
            name: '领劵',
            bg_color: '',
            br_color: '#EA9223',
            color: '#EA9223',
            url: '',
        },
    ],
};
// 数据来源的内容
const data_source_content_list = computed(() => {
    // 是自定义数据类型的时候，显示自定义数据，否则显示数据来源的数据
    if (Number(form.value.data_source_content.data_type) === 0 && !isEmpty(form.value.data_source_content.data_list)) {
        const list = form.value.data_source_content?.data_list || [];
        return list.map((item: any) => ({
            ...item.data,
            title: !isEmpty(item.new_title) ? item.new_title : item.data.title,
            new_cover: item.new_cover,
        }));;
    } else if (!isEmpty(form.value.data_source_content.data_auto_list)) {
        return form.value.data_source_content.data_auto_list;
    } else {
        return Array(4).fill(default_list);
    }
})
</script>
<style lang="scss" scoped>
</style>

<template>
    <div :style="style_container">
        <tabs-view ref="tabs" :value="props.value"></tabs-view>
        <div class="pt-10">
            <model-shop-list :value="tabs_list" :is-common-style="false"></model-shop-list>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

const style_container = ref('');
const tabs_list = ref(props.value);

watch(tabs_list.value, (val) => {
    const new_style = val?.style;
    let new_data = val;
    // 产品的值
    new_data.content.product_check = new_data.content.tabs_list[0].product_check;
    new_data.content.goods_category_ids = new_data.content.tabs_list[0].goods_category_ids;
    new_data.content.goods_brand_ids = new_data.content.tabs_list[0].goods_brand_ids;
    new_data.content.number = new_data.content.tabs_list[0].number;
    new_data.content.is_price_solo = new_data.content.tabs_list[0].is_price_solo;
    new_data.content.sort = new_data.content.tabs_list[0].sort;
    new_data.content.sort_rules = new_data.content.tabs_list[0].sort_rules;
    new_data.content.product_list = new_data.content.tabs_list[0].product_list;
    
    tabs_list.value = new_data;
    // 公共样式
    style_container.value += common_styles_computer(new_style.common_style);
},{ immediate: true, deep: true });
</script>
<style lang="scss" scoped>
</style>

<template>
    <div :style="style_container">
        <div class="flex-col" :style="style_img_container">
            <div class="oh" :style="tabs_container">
                <div class="oh" :style="tabs_img_container">
                    <tabs-view ref="tabs" :value="props.value" :active-index="tabs_active_index"></tabs-view>
                </div>
            </div>
            <div class="oh" :style="shop_container">
                <div class="oh" :style="shop_img_container">
                    <model-goods-list :value="tabs_list" :is-common-style="false"></model-goods-list>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, border_computer, box_shadow_computer, common_img_computer, common_styles_computer, gradient_computer, margin_computer, padding_computer, radius_computer } from '@/utils';
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
// 选项卡内容样式设置
const tabs_container = ref('');
const tabs_img_container = ref('');
// 商品区域样式设置
const shop_container = ref('');
const shop_img_container = ref('');
watch(
    () => props.value,
    (val) => {
        const new_val = cloneDeep(val);
        const new_style = new_val?.style;
        let new_data = new_val;
        tabs_active_index.value = new_data.content.tabs_active_index;
        // 选项卡背景设置
        const tabs_data = {
            color_list: new_style.tabs_bg_color_list,
            direction: new_style.tabs_bg_direction,
            background_img_style: new_style.tabs_bg_background_img_style,
            background_img: new_style.tabs_bg_background_img,
        }
        tabs_container.value = gradient_computer(tabs_data) + radius_computer(new_style.tabs_radius) + margin_computer(new_style.tabs_margin) + border_computer(new_style.tabs_content) + box_shadow_computer(new_style.tabs_content);
        tabs_img_container.value = background_computer(tabs_data) + padding_computer(new_style.tabs_padding);
        // 商品区域背景设置
        const shop_content_data = {
            color_list: new_style.shop_content_color_list,
            direction: new_style.shop_content_direction,
            background_img_style: new_style.shop_content_background_img_style,
            background_img: new_style.shop_content_background_img,
        }
        shop_container.value = gradient_computer(shop_content_data) + margin_computer(new_style.shop_content_margin) + radius_computer(new_style.shop_content_radius) + border_computer(new_style.shop_content) + box_shadow_computer(new_style.shop_content);
        shop_img_container.value = background_computer(shop_content_data) + padding_computer(new_style.shop_content_padding);
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
        style_img_container.value = common_img_computer(new_style.common_style) + `gap: ${new_style.shop_content_spacing}px;`;
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

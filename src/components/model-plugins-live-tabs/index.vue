<template>
    <div :style="style_container">
        <div class="flex-col" :style="style_img_container">
            <div class="oh" :style="tabs_container">
                <div class="oh" :style="tabs_img_container">
                    <tabs-view ref="tabs" :value="plugins_live_tabs" :active-index="tabs_active_index" :tabs-sliding-fixed-bg="tabs_sliding_fixed_bg"></tabs-view>
                </div>
            </div>
            <div class="oh" :style="plugins_live_container">
                <div class="oh" :style="plugins_live_img_container">
                    <model-plugins-live-list :value="plugins_live_tabs" :is-common-style="false"></model-plugins-live-list>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, border_computer, box_shadow_computer, common_img_computer, common_styles_computer, gradient_computer, margin_computer, padding_computer, radius_computer } from '@/utils';
import { cloneDeep } from 'lodash';
/**
 * @description: 直播选项卡列表 （渲染）
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
const plugins_live_tabs = ref({});
const tabs_active_index = ref(0);
// 选项卡独立样式
const tabs_container = ref('');
const tabs_img_container = ref('');
// 区域内边距
const plugins_live_container = ref('');
const plugins_live_img_container = ref('');
// 打开滑动固定开关之后，显示的样式
const tabs_sliding_fixed_bg = ref('');
watch(
    () => props.value,
    (val) => {
        const newVal = cloneDeep(val);
        const new_style = newVal?.style;
        let new_data = newVal;
        tabs_active_index.value = new_data.content.tabs_active_index;
        // 选项卡背景设置
        const tabs_data = {
            color_list: new_style.tabs_bg_color_list,
            direction: new_style.tabs_bg_direction,
            background_img_style: new_style.tabs_bg_background_img_style,
            background_img: new_style.tabs_bg_background_img,
        }
        tabs_sliding_fixed_bg.value = gradient_computer(tabs_data);
        tabs_container.value = gradient_computer(tabs_data) + radius_computer(new_style.tabs_radius) + margin_computer(new_style.tabs_margin) + border_computer(new_style.tabs_content) + box_shadow_computer(new_style.tabs_content);
        tabs_img_container.value = background_computer(tabs_data) + padding_computer(new_style.tabs_padding);
        // 直播区域背景设置
        const plugins_live_content_data = {
            color_list: new_style.plugins_live_content_color_list,
            direction: new_style.plugins_live_content_direction,
            background_img_style: new_style.plugins_live_content_background_img_style,
            background_img: new_style.plugins_live_content_background_img,
        }
        plugins_live_container.value = gradient_computer(plugins_live_content_data) + margin_computer(new_style.plugins_live_content_margin) + radius_computer(new_style.plugins_live_content_radius) + border_computer(new_style.plugins_live_content) + box_shadow_computer(new_style.plugins_live_content);
        plugins_live_img_container.value = background_computer(plugins_live_content_data) + padding_computer(new_style.plugins_live_content_padding);
        // 将当前选项卡的筛选条件同步到内嵌直播列表组件（复用 plugins-live-list）
        const active_tab = new_data.content.tabs_list[tabs_active_index.value];
        new_data.content.theme = new_data.content.plugins_live_theme;
        new_data.content.data_type = active_tab.data_type;
        new_data.content.keywords = active_tab.keywords;
        new_data.content.live_status = active_tab.live_status ?? [];
        new_data.content.is_recommended = active_tab.is_recommended ?? '';
        new_data.content.carousel_col = new_data.content.plugins_live_carousel_col;
        new_data.content.data_list = active_tab.data_list;
        new_data.content.data_auto_list = active_tab.data_auto_list;
        new_data.content.data_ids = active_tab.data_ids;
        new_data.content.number = active_tab.number;
        new_data.content.order_by_type = active_tab.order_by_type;
        new_data.content.order_by_rule = active_tab.order_by_rule ?? 0;
        new_data.content.field_show = new_data.content.field_show;
        new_data.content.is_cover = active_tab.is_cover;
        plugins_live_tabs.value = new_data;

        style_container.value = common_styles_computer(new_style.common_style);
        style_img_container.value = common_img_computer(new_style.common_style) + `gap: ${new_style.plugins_live_content_spacing}px;`;
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

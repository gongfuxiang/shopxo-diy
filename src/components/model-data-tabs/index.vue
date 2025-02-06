<template>
    <div :style="style_container">
        <div class="flex-col" :style="style_img_container">
            <div class="oh" :style="tabs_container">
                <div class="oh" :style="tabs_img_container">
                    <tabs-view ref="tabs" :value="props.value" :active-index="tabs_active_index"></tabs-view>
                </div>
            </div>
            <div class="oh" :style="data_container">
                <div class="oh" :style="data_img_container">
                    <template v-if="tabs_data_type == 'goods'">
                        <model-goods-list :value="tabs_list" :is-common-style="false"></model-goods-list>
                    </template>
                    <template v-else-if="tabs_data_type == 'article'">
                        <model-article-list :value="tabs_list" :is-common-style="false"></model-article-list>
                    </template>
                    <template v-else-if="tabs_data_type == 'custom'">
                        <model-custom :value="tabs_list" :outer_container_padding="outer_container_width" :is-common-style="false"></model-custom>
                    </template>
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
const tabs_data_type = ref('');
// 选项卡内容样式设置
const tabs_container = ref('');
const tabs_img_container = ref('');
// 商品区域样式设置
const data_container = ref('');
const data_img_container = ref('');
// 外层容器的间距
const outer_container_width = ref(0);
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
        // 内容区域背景设置
        const data_content = {
            color_list: new_style.data_content_color_list,
            direction: new_style.data_content_direction,
            background_img_style: new_style.data_content_background_img_style,
            background_img: new_style.data_content_background_img,
        }
        data_container.value = gradient_computer(data_content) + margin_computer(new_style.data_content_margin) + radius_computer(new_style.data_content_radius) + border_computer(new_style.data_content) + box_shadow_computer(new_style.data_content);
        data_img_container.value = background_computer(data_content) + padding_computer(new_style.data_content_padding);
        const common_style = new_style.common_style;
        // 自定义需要做等比缩放，因此宽度需要减去 外层通用的宽度和内容区域的宽度
        outer_container_width.value = common_style.margin_left + common_style.margin_right + common_style.padding_left + common_style.padding_right + new_style.data_content_margin.margin_left + new_style.data_content_margin.margin_right + new_style.data_content_padding.padding_left + new_style.data_content_padding.padding_right;
        // 显示的数据处理
        const tabs_data_list = new_data.content.tabs_list[tabs_active_index.value] || {};
        tabs_data_type.value = tabs_data_list?.tabs_data_type || '';
        if (tabs_data_list.tabs_data_type === 'goods') {
            tabs_list.value = tabs_data_list.goods_config;
        } else if (tabs_data_list.tabs_data_type === 'article') {
            tabs_list.value = tabs_data_list.article_config;
        } else if (tabs_data_list.tabs_data_type === 'custom') {
            tabs_list.value = tabs_data_list.custom_config;
        }
        // 公共样式
        style_container.value += common_styles_computer(new_style.common_style);
        style_img_container.value = common_img_computer(new_style.common_style) + `gap: ${new_style.data_content_spacing}px;`;
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>

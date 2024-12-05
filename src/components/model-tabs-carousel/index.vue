<template>
    <div :style="style_container">
        <div class="flex-col oh" :style="style_img_container">
            <div class="oh" :style="tabs_container">
                <div class="oh" :style="tabs_img_container">
                    <tabs-view ref="tabs" :value="tabs_list" :is-tabs="true" :active-index="tabs_active_index"></tabs-view>
                </div>
            </div>
            <div class="oh" :style="carousel_container">
                <div class="oh" :style="carousel_img_container">
                    <model-carousel :value="value" :is-common="false"></model-carousel>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer, padding_computer, gradient_computer, background_computer, margin_computer, radius_computer } from '@/utils';
import { cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

const tabs_list = ref(props.value);
const tabs_active_index = ref(0);
// 选项卡内容样式
const tabs_container = ref('');
const tabs_img_container = ref('');
// 轮播区域背景设置
const carousel_container = ref('');
const carousel_img_container = ref('');
watch(
    props.value,
    (val) => {
        let new_data = cloneDeep(val);
        const { home_data } = new_data.content;
        const new_style = new_data?.style;
        // 选项卡背景设置
        const tabs_data = {
            color_list: new_style.tabs_bg_color_list,
            direction: new_style.tabs_bg_direction,
            background_img_style: new_style.tabs_bg_background_img_style,
            background_img: new_style.tabs_bg_background_img,
        }
        tabs_container.value = gradient_computer(tabs_data) + radius_computer(new_style.tabs_radius);
        tabs_img_container.value = background_computer(tabs_data) + padding_computer(new_style.tabs_padding);
        // 轮播区域背景设置
        const carousel_content_data = {
            color_list: new_style.carousel_content_color_list,
            direction: new_style.carousel_content_direction,
            background_img_style: new_style.carousel_content_background_img_style,
            background_img: new_style.carousel_content_background_img,
        }
        carousel_container.value = gradient_computer(carousel_content_data) + margin_computer(new_style.carousel_content_margin) + radius_computer(new_style.carousel_content_radius);
        carousel_img_container.value = background_computer(carousel_content_data) + padding_computer(new_style.carousel_content_padding);
        // 处理数据
        new_data.content.tabs_list = [home_data, ...new_data.content.tabs_list];
        tabs_list.value = new_data;
    },
    { immediate: true, deep: true }
);

const style_container = computed(() => `${common_styles_computer(props.value.style.common_style)};`);
const style_img_container = computed(() => `${common_img_computer(props.value.style.common_style)};gap:${props.value.style.data_spacing}px`);
</script>
<style lang="scss" scoped></style>

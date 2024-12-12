<template>
    <div :style="style_container + swiper_bg_style">
        <div class="flex-col oh" :style="style_img_container + swiper_bg_img_style">
            <div class="oh" :style="tabs_container">
                <div class="oh" :style="tabs_img_container">
                    <tabs-view ref="tabs" :value="tabs_list" :is-tabs="true" :active-index="tabs_active_index"></tabs-view>
                </div>
            </div>
            <div class="oh" :style="carousel_container">
                <div class="oh" :style="carousel_img_container">
                    <model-carousel :value="value" :is-common="false" @slide-change="slideChange"></model-carousel>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer, padding_computer, gradient_computer, background_computer, margin_computer, radius_computer } from '@/utils';
import { cloneDeep, isEmpty } from 'lodash';
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

const form = computed(() => props.value.content);
const actived_index = ref(0);
const slideChange = (index: number) => {
    actived_index.value = index;
};

const swiper_bg_style = computed(() => {
    const style = form.value?.carousel_list?.[actived_index.value]?.style;
    if (style && !isEmpty(style.color_list)) {
        const color_list = style.color_list;
        const list = color_list.filter((item: { color: string }) => !isEmpty(item.color));
        if (list.length > 0) {
            try {
                return gradient_computer(style);
            } catch (error) {
                return '';
            }
        }
        return '';
    }
    return '';
});

const swiper_bg_img_style = computed(() => {
    if (!isEmpty(form.value?.carousel_list[actived_index.value]?.style?.background_img)) {
        return background_computer(form.value.carousel_list[actived_index.value].style);
    }
    return '';
});
</script>
<style lang="scss" scoped></style>

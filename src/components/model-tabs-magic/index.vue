<template>
    <div class="re" :style="style_container + swiper_bg_style">
        <div class="abs z-i top-0 w h" :style="swiper_bg_img_style"></div>
        <div class="flex-col oh" :style="style_img_container + (!isEmpty(swiper_bg_img_style) ? `background-image: url('');` : '')">
            <div class="oh z-deep re" :style="tabs_container + (is_rotating_background ? swiper_bg_style : '')">
                <div v-if="is_rotating_background" class="abs z-i top-0 w h" :style="swiper_bg_img_style"></div>
                <div class="oh re z-deep" :style="tabs_img_container">
                    <tabs-view ref="tabs" :value="tabs_list" :is-tabs="true" :active-index="tabs_active_index" :tabs-sliding-fixed-bg="tabs_sliding_fixed_bg"></tabs-view>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer, padding_computer, gradient_computer, background_computer, margin_computer, radius_computer, box_shadow_computer, border_computer } from '@/utils';
import { cloneDeep, isEmpty } from 'lodash';
import { commonStore } from '@/store';
const common_store = commonStore();

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
// 打开滑动固定开关之后，显示的样式
const tabs_sliding_fixed_bg = ref('');
const is_rotating_background = ref(false);
watch(
    props.value,
    (val) => {
        let new_data = cloneDeep(val);
        const { home_data, is_tabs_safe_distance = '0', rotating_background } = new_data.content;
        const new_style = new_data?.style;
        // 选项卡背景设置
        const tabs_data = {
            color_list: new_style.tabs_bg_color_list,
            direction: new_style.tabs_bg_direction,
            background_img_style: new_style.tabs_bg_background_img_style,
            background_img: new_style.tabs_bg_background_img,
        }
        // 选项卡是否开启了安全距离
        const is_general_safe_distance = common_store.is_general_safe_distance && is_tabs_safe_distance == '1';
        const new_tabs_padding = {
            ...new_style.tabs_padding,
            padding_top: (new_style.tabs_padding?.padding_top || 0) + (is_general_safe_distance ? common_store.header_height : 0),
        }
        // 是否开启轮播图背景设置
        is_rotating_background.value = rotating_background == '1';
        // 选项卡滑动固定背景
        tabs_sliding_fixed_bg.value = gradient_computer(tabs_data);
        tabs_container.value = gradient_computer(tabs_data) + radius_computer(new_style.tabs_radius) + margin_computer(new_style.tabs_margin) + box_shadow_computer(new_style.tabs_content) + border_computer(new_style.tabs_content) + `margin-top: ${ new_style.tabs_margin.margin_top - (is_general_safe_distance ? common_store.header_height : 0) }px;`;
        tabs_img_container.value = background_computer(tabs_data) + padding_computer(new_tabs_padding);
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
    // const style = form.value?.carousel_list?.[actived_index.value]?.style;
    // if (style && !isEmpty(style.color_list)) {
    //     const color_list = style.color_list;
    //     const list = color_list.filter((item: { color: string }) => !isEmpty(item.color));
    //     if (list.length > 0) {
    //         try {
    //             return gradient_computer(style);
    //         } catch (error) {
    //             return '';
    //         }
    //     }
    //     return '';
    // }
    return '';
});

const swiper_bg_img_style = computed(() => {
    // const { carousel_img, style = {} } = form.value?.carousel_list[actived_index.value] || {};
    // // 如果是自定义的图片 判断图片是否存在
    // if (!isEmpty(carousel_img) && style?.background_type == 'carousel') {
    //     // 如果是使用轮播图，判断轮播图是否存在
    //     const data = {
    //         background_img: carousel_img,
    //         background_img_style: style?.background_img_style || '2',
    //     }
    //     return background_computer(data) + (style.is_background_img_blur == '1' ? `filter: blur(14px);opacity: 0.6;` : '');
    // } else if (!isEmpty(style?.background_img)) {
    //     return background_computer(style) + (style.is_background_img_blur == '1' ? `filter: blur(14px);opacity: 0.6;` : '');
    // }
    return '';
});
</script>
<style lang="scss" scoped></style>

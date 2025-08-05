<template>
    <div class="re" :style="style_container + style_active_container + swiper_bg_style">
        <div class="abs z-i top-0 w h" :style="swiper_bg_img_style"></div>
        <div class="flex-col oh" :style="style_img_container + style_active_img_container + (!isEmpty(swiper_bg_img_style) ? `background-image: url('');` : '')">
            <div class="oh z-deep re" :style="tabs_container + (is_rotating_background ? swiper_bg_style : '')">
                <div v-if="is_rotating_background" class="abs z-i top-0 w h" :style="swiper_bg_img_style"></div>
                <div class="oh re z-deep" :style="tabs_img_container">
                    <tabs-view ref="tabs" :value="tabs_list" :is-tabs="true" :active-index="tabs_active_index" :tabs-sliding-fixed-bg="tabs_sliding_fixed_bg"></tabs-view>
                </div>
            </div>
            <div :style="magic_container">
                <div :style="magic_img_container">
                    <!-- 轮播 -->
                    <template v-if="tabs_magic_type === 'carousel'"> 
                        <model-carousel :value="tabs_magic_value" :is-common-style="false" @slide-change="slideChange"></model-carousel>
                    </template>
                    <!-- 导航组 -->
                    <template v-else-if="tabs_magic_type === 'nav_group'"> 
                        <model-nav-group :value="tabs_magic_value" :is-common-style="false"></model-nav-group>
                    </template>
                    <!-- 自定义 -->
                    <template v-else-if="tabs_magic_type === 'custom'"> 
                        <model-custom :value="tabs_magic_value" :magic-scale="magic_scale" :is-common-style="false"></model-custom>
                    </template>
                    <!-- 商品魔方 -->
                    <template v-else-if="tabs_magic_type === 'goods_magic'"> 
                        <model-goods-magic :value="tabs_magic_value" :is-common-style="false"></model-goods-magic>
                    </template>
                    <!-- 图片魔方 -->
                    <template v-else-if="tabs_magic_type === 'img_magic'"> 
                        <model-img-magic :value="tabs_magic_value" :is-common-style="false"></model-img-magic>
                    </template>
                    <!-- 热区 -->
                    <template v-else-if="tabs_magic_type === 'hot_zone'"> 
                        <model-hot-zone :value="tabs_magic_value" :is-common-style="false"></model-hot-zone>
                    </template>
                    <!-- 文章列表 -->
                    <template v-else-if="tabs_magic_type === 'article_list'"> 
                        <model-article-list :value="tabs_magic_value" :is-common-style="false"></model-article-list>
                    </template>
                    <!-- 商品列表 -->
                    <template v-else-if="tabs_magic_type === 'goods_list'"> 
                        <model-goods-list :value="tabs_magic_value" :is-common-style="false"></model-goods-list>
                    </template>
                    <!-- 视频 -->
                    <template v-else-if="tabs_magic_type === 'video'"> 
                        <model-video :value="tabs_magic_value" :is-common-style="false"></model-video>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer, padding_computer, gradient_computer, background_computer, margin_computer, radius_computer, box_shadow_computer, border_computer, border_width } from '@/utils';
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
// 当前选中的选项卡对应的type类型
// 获取当前选中的选项卡的数据
const active_tabs_value = computed(() => tabs_list.value.content.tabs_list[tabs_active_index.value]);
// 获取选中的类型
const tabs_magic_type = computed(() => active_tabs_value.value.magic_type)
// 获取选中的魔方数据
const tabs_magic_value = computed(() => active_tabs_value.value[tabs_magic_type.value]);
// 判断是否开启轮播图背景设置
const is_rotating_background = computed(() => active_tabs_value.value.rotating_background == '1');
// 选中的公共样式
const style_active_container = computed(() => tabs_magic_value.value.style.magic_common.is_show == '1' ? gradient_computer(tabs_magic_value.value.style.magic_common) : '');
const style_active_img_container = computed(() => tabs_magic_value.value.style.magic_common.is_show == '1' ? background_computer(tabs_magic_value.value.style.magic_common) : '');
// 选中的内容区域样式
const magic_container = computed(() => common_styles_computer(tabs_magic_value.value.style.magic_content));
const magic_img_container = computed(() => common_img_computer(tabs_magic_value.value.style.magic_content));
//#region 图片魔方的缩放比例
const new_style = computed(() => props.value.style);
// 图片魔方的缩放比例
const magic_scale = ref(1);
watchEffect(() => {
    // 获取公共样式的数据
    const common_data = new_style.value.common_style;
    const common_width = common_data.margin_left + common_data.margin_right + common_data.padding_left + common_data.padding_right + border_width(common_data);

    const { margin_left, margin_right, padding_left, padding_right } = tabs_magic_value.value.style.magic_content;
    const content_width = margin_left + margin_right + padding_left + padding_right + border_width(tabs_magic_value.value.style.magic_content);
    // 根据容器宽度来计算内部大小
    const typewidth = 390 - content_width - common_width;
    // 获得对应宽度的比例
    magic_scale.value = typewidth / 390;
});
//#endregion
// 全局公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => `${common_img_computer(new_style.value.common_style)};gap:${new_style.value.data_spacing}px;`);
//#region 轮播切换时更新背景信息
const actived_index = ref(0);
const slideChange = (index: number) => {
    actived_index.value = index;
};
// 轮播更新背景色
const swiper_bg_style = computed(() => {
    if (tabs_magic_type.value == 'carousel') {
        const style = tabs_magic_value.value.content?.carousel_list?.[actived_index.value]?.style;
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
    }
    return '';
});
// 轮播更新背景图
const swiper_bg_img_style = computed(() => {
    if (tabs_magic_type.value == 'carousel') {
        const { carousel_img, style = {} } = tabs_magic_value.value.content?.carousel_list[actived_index.value] || {};
        // 如果是自定义的图片 判断图片是否存在
        if (!isEmpty(carousel_img) && style?.background_type == 'carousel') {
            // 如果是使用轮播图，判断轮播图是否存在
            const data = {
                background_img: carousel_img,
                background_img_style: style?.background_img_style || '2',
            }
            return background_computer(data) + (style.is_background_img_blur == '1' ? `filter: blur(14px);opacity: 0.6;` : '');
        } else if (!isEmpty(style?.background_img)) {
            return background_computer(style) + (style.is_background_img_blur == '1' ? `filter: blur(14px);opacity: 0.6;` : '');
        }
    }
    return '';
});
//#endregion
watch(() => props.value,
    (val) => {
        let new_data = cloneDeep(val);
        const { home_data, is_tabs_safe_distance = '0' } = new_data.content;
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
        // 选项卡滑动固定背景
        tabs_sliding_fixed_bg.value = gradient_computer(tabs_data);
        tabs_container.value = gradient_computer(tabs_data) + radius_computer(new_style.tabs_radius) + margin_computer(new_style.tabs_margin) + box_shadow_computer(new_style.tabs_content) + border_computer(new_style.tabs_content) + `margin-top: ${ new_style.tabs_margin.margin_top - (is_general_safe_distance ? common_store.header_height : 0) }px;`;
        tabs_img_container.value = background_computer(tabs_data) + padding_computer(new_tabs_padding);
        // 处理数据
        new_data.content.tabs_list = [home_data, ...new_data.content.tabs_list];
        tabs_list.value = new_data;
        // 当前选中的内容
        tabs_active_index.value = new_data.content.tabs_active_index;
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped></style>
